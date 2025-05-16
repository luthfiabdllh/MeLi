import AppLayoutFull from "@/components/components/appLayoutFull"
import DoctorChatInterface from "@/components/components/doctorChatInterface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Doctor Chat - MeLi",
  description: "Chat with our AI doctor assistant powered by Gemini",
}

export default function DoctorChatPage() {
  return (
    <AppLayoutFull>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Doctor Chat</h1>
        <p className="text-muted-foreground mb-6">
          Consult with our AI doctor assistant for health-related questions and advice.
        </p>
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
          <DoctorChatInterface />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This AI doctor assistant provides general information and is not a substitute
            for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may have
            regarding a medical condition.
          </p>
        </div>
      </div>
    </AppLayoutFull>
  )
}
