<br />
<div align="center">
  <a href="https://github.com/luthfiabdllh/MeLi">
    <img src="frontend/public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Medical Literation </h3>

  <p align="center">
    MeLi (Medical Literation)
    <br />
    <a href="https://github.com/luthfiabdllh/MeLi"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project
MeLi is the first youth-focused, web-based health literacy platform in Indonesia. It is designed to empower young people with accurate, trustworthy, and engaging health information.

MeLi combines three powerful elements:

✅ Trusted content curated by health professionals

🗣️ Community engagement that encourages open discussions among youth

📚 Article-based learning through informative and relatable content

All delivered in a familiar, social media-style interface that makes learning about health fun, accessible, and relevant.

MeLi’s mission is to improve health literacy among Indonesian youth by bridging the gap between education, technology, and community in one seamless digital experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### ✨ Key Features
- **🏠 Home Feed**: Share and read short health-related posts in thread-style conversations
- **🔄 Interactive Engagement**: Interact with posts by upvoting, downvoting, commenting, and reposting valuable health content.
- **🤖 Health Chatbot (AI-Powered)**: Instantly get answers, lifestyle tips, and clarification on health misinformation through an AI-powered chatbot.
- **👥 Communities by Interest**: Join topic-based health communities for moderated, respectful, and focused discussions.
- **📚 Trusted Health Articles**: Access curated articles from reliable sources, categorized by topic and followed by discussion sections.


### 🏗️ Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Shadcn][Shadcn.com]][Shadcn-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Laravel][Gemini.com]][Gemini-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to set up this project locally on your machine.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm
  ```sh
  npm install npm@latest -g
  ```
* PHP >= 8.1
* Composer (Dependency Manager for PHP) https://getcomposer.org/
* MySQL or any database supported by Laravel

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/luthfiabdllh/MeLi
   ```

### Frontend Installation
1. Navigate to the frontend directory
   ```sh
   cd frontend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Copy example environment variables
   ```sh
   cp .env.example .env.local
   ```
3. Enter your env key in `.env`
   ```env
   NEXT_PUBLIC_API_BASE_URL= backend_url
   NEXTAUTH_URL= frontend_url
   NEXTAUTH_SECRET=""
   ```
4. Run the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

### Backend Installation
1. Navigate to the backend directory
   ```sh
   cd backend
   ```
3. Copy example environment file
   ```sh
   cp .env.example .env
   ```
3. Install dependencies
   ```sh
   composer install
   ```
3. Install Gemini Laravel
   ```sh
   php artisan gemini:install
   ```
3. Generate application key
   ```sh
   php artisan key:generate
   ```
3. Configure your  `.env` file with correct database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password

   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run miggrations and seeder
   ```sh
   php artisan migrate --seed
   ```
4. Start the development server
   ```sh
   php artisan serve
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📂 Project Structure Frontend

```
meli_fe/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router pages and layouts
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── providers/     # Context provider
│   │   ├── api/       # Api from backend
│   │   ├── auth/      # Authentication logic
│   │   ├── app/       # Dashboard application
|   |   |   └──profile # User Profile
│   │   ├── article/   # Article detail
│   │   ├── articles/  # Get all article
│   │   ├── chatAi/    # Ai chatbot
│   │   ├── communities/  # Get all communities
│   │   ├── community/    # community profile
│   │   ├── post/      # Post thread
│   │   └── user/     # Other user profile
│   └── layout/        # Layout components
├── .env.example       # Example environment variables
├── next.config.ts     # Next.js configuration
└── tsconfig.json      # TypeScript configuration
```

## 📂 Project Structure Backend
```
meli-be/
├── app/                    # Main application logic, including controllers, models, middleware, etc.
│   ├── Console/            # Artisan command classes (custom CLI commands).
│   ├── Exceptions/         # Custom exception handling logic.
│   ├── Http/               # Handles HTTP requests, including controllers and middleware.
│   │   ├── Controllers/    # All controller classes that handle request/response logic.
│   │   ├── Middleware/     # Middleware classes to filter HTTP requests.
│   ├── Models/             # Eloquent model classes that interact with the database.
│   └── Providers/          # Service providers used to register application services.
├── bootstrap/              # Contains files for bootstrapping the application.
│   └── app.php             # Initializes the Laravel framework and loads configuration.
├── config/                 # All configuration files (e.g. app.php, database.php, mail.php, etc.).
├── database/               # Contains files related to the database.
│   ├── factories/          # Model factory classes for generating fake data.
│   ├── migrations/         # Database schema definition files.
│   └── seeders/            # Classes used to populate the database with test data.
├── lang/                   #	Language translation files for localization.
│   └── en/                 # Default English language files.
├── public/                 # Publicly accessible files, such as entry point (index.php), assets, etc.
│   ├── index.php           #	The front controller — all requests are routed through this file.
├── resources/ 	            # Contains frontend files and views.
│   ├── js/                 # Blade template files (HTML views).
│   ├── views/              # JavaScript source files (if using Laravel Mix/Vite).
│   └── sass/               # SCSS/CSS source files. 
├── routes/                 # Contains route definitions.
│   ├── web.php 	          # Web interface routes (typically return views).
│   ├── api.php             # API routes (typically return JSON).
│   ├── console.php         # Artisan CLI routes.
│   └── channels.php        # Channel route definitions for broadcasting.
├── storage/                # File storage used by the application.
│   ├── app/                #	User and application uploaded files.
│   ├── framework/          #	Framework-generated files (cache, sessions, views).
│   └── logs/               #	Log files generated by the application.
├── vendor/                 #	Composer-managed PHP dependencies (autogenerated).
│   └── (composer dependencies)
├── .env                   # Environment configuration file (not committed to version control).
├── artisan                # Laravel CLI tool to run commands.
├── composer.json          # Composer dependency definitions.
├── package.json           # Node.js dependencies (for frontend tooling).
└── README.md
```

## 📱 Application Features

### 🧵 Home Feed (Thread-Based Discussions)
- Post and read short content (text, image, links) on health-related topics
- Thread-style conversations inspired by Twitter/X

### 🔄 Interactive Engagement
- Upvote, downvote, and repost helpful or interesting health threads
- Comment to ask questions or share opinions

### 🤖 Health Chatbot (AI-Powered)
- Get real-time answers to common health questions
- Receive healthy lifestyle suggestions
- Identifies and clarifies health misinformation

### 👥 Communities by Interest
- Join groups based on specific health categories (mental health, fitness, chronic illness, etc.)
- Engage in thread-style discussions within each community
- Moderated for credibility and respectful conversation

### 📚 Trusted Health Articles
- Curated from reliable sources like WHO, Ministry of Health, and medical journals
- Filtered by category (e.g., lifestyle, mental health, infectious diseases)
- Post-article discussion sections for community insight

<!-- CONTRIBUTING -->
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Luthfi - [luthfi-abdllh](https://www.linkedin.com/in/luthfi-abdllh/) - ahmadluthfiabdillah@mail.ugm.ac.id

Project Link: [https://github.com/luthfiabdllh/MeLi](https://github.com/luthfiabdllh/MeLi)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!


* [Next.js](https://nextjs.org/)
* [Laravel]( https://laravel.com)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Gemini](https://gemini.google.com/)
* All the amazing open-source libraries used in this project

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Shadcn.com]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Gemini.com]: https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=ffff
[Gemini-url]: https://gemini.google.com/
