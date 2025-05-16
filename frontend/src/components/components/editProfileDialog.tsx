"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { toast } from "../../../hooks/use-toast"
import { useSession } from "next-auth/react"
import { editUserDetails, getOwnUserDetails, uploadAvatar } from "@/app/api/user/profileApi"
import { useRouter } from "next/navigation"

interface EditProfileDialogProps {
  user?: {
    name: string
    username: string
    avatar: string
    bio: string
    birthdate?: string
    address?: string
    phone?: string
    gender?: string
  }
  trigger?: React.ReactNode
}

export function EditProfileDialog({ user, trigger }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  // Form state
  const [avatar, setAvatar] = useState<string>(user?.avatar || "/placeholder.svg?height=200&width=200&text=SR")
  const [username, setUsername] = useState(user?.username || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [birthdate, setBirthdate] = useState<Date | undefined>(user?.birthdate ? new Date(user.birthdate) : undefined)
  const [address, setAddress] = useState(user?.address || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [gender, setGender] = useState(user?.gender || "")
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // File upload preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file); // <-- Tambahkan baris ini!
    }
  };
  const clearFilePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      if (open && session?.accessToken && session.user?.id) {
        try {
          const userDetails = await getOwnUserDetails(session.accessToken, session.user.id);
          setAvatar(userDetails.image || "/placeholder.svg?height=200&width=200&text=PR");
          setUsername(userDetails.username || "");
          setBio(userDetails.bio || "");
          setBirthdate(
            userDetails.birthdate
              ? new Date(userDetails.birthdate)
              : userDetails.birthDate
              ? new Date(userDetails.birthDate)
              : undefined
          );
          setAddress(userDetails.address || "");
          setPhone(userDetails.phone || "");
          setGender(userDetails.gender || "male");
          setPreviewUrl(null);
          setSelectedFile(null);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch user details.",
            variant: "destructive",
          });
        }
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, session?.accessToken, session?.user?.id]);

  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const token = session?.accessToken;
    if (!token || !session.user?.id) {
      throw new Error("Token and user ID are required.");
    }

    let imageId = avatar; // default, jika tidak upload baru

    if (selectedFile) {
      imageId = await uploadAvatar(token, selectedFile);
      setAvatar(imageId);
    }

    console.log("Selected file:", imageId);

    await editUserDetails(token, session.user.id, {
      username,
      birthDate: birthdate ? format(birthdate, "yyyy-MM-d") : null,
      address,
      phone,
      gender,
      bio,
      image_id: Number(imageId),
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })

    setOpen(false)
  } catch (error) {
    toast({
      title: "Error",
      description: "There was an error updating your profile. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsLoading(false)
    window.location.reload()
  }
}
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          clearFilePreview()
        }
        setOpen(newOpen)
      }}
    >
      <DialogTrigger asChild>{trigger || <Button variant="outline">Edit Profile</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hidden">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Profile Photo */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="block">
              Profile Photo
            </Label>
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                <AvatarImage src={previewUrl || avatar} alt="Profile" />
                <AvatarFallback>{username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => document.getElementById("photo")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
                {previewUrl && (
                  <Button type="button" variant="outline" size="sm" onClick={clearFilePreview}>
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          {/* Birthdate */}
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate ? format(birthdate, "yyyy-MM-dd") : ""}
              onChange={(e) => setBirthdate(e.target.value ? new Date(e.target.value) : undefined)}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={address}
              className=" break-all"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              type="tel"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              className=" break-all"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
