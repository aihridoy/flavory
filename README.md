# 🍲 Flavory - Culinary Web Application

Welcome to **Flavory**, a delightful web application built with Next.js that brings culinary magic to your fingertips! Whether you're here to explore recipes, share your own, or connect with food enthusiasts, Flavory has you covered. Powered by modern tech and deployed on Vercel, this app is fast, secure, and ready to savor.

---

## 🌟 Live Demo

**🔗 [Visit Flavory](https://flavory-phi.vercel.app)**

Experience the full culinary journey with our live application!

---

## ✨ Key Features

### 🔐 User Authentication
- Secure login and registration with email and password
- NextAuth.js v5 integration with Credentials Provider
- Protected routes and user session management

### 📱 Responsive Design
- Mobile-first design approach
- Optimized for desktops, tablets, and smartphones
- Seamless user experience across all devices

### ⚡ Performance & Scalability
- Built with Next.js 14 for optimal performance
- Server-side rendering and static generation
- Lightning-fast load times with Vercel deployment
- MongoDB backend for scalable data storage

### 🔧 Extensible Architecture
- Modular component structure
- Easy to extend with new features:
  - Recipe sharing functionality
  - User profiles and social features
  - Advanced search and filtering
  - Rating and review systems

---

## 🛠️ Tech Stack

### Frontend & Backend
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **API**: Next.js API Routes for backend functionality
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern UI design

### Authentication & Database
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (Credentials Provider)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **Session Management**: JWT-based authentication

### Deployment & Tools
- **Hosting**: [Vercel](https://vercel.com/) for seamless deployment
- **Version Control**: Git with GitHub integration
- **Package Manager**: npm/yarn

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (>= 18.x) - [Download here](https://nodejs.org/)
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** - [Download here](https://git-scm.com/)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aihridoy/flavory.git
   cd flavory
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/flavory
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://[username]:[password]@cluster.mongodb.net/flavory

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Application Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser to see Flavory in action!

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
flavory/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── ...                # Other app pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── models/                # MongoDB/Mongoose models
├── public/                # Static assets
│   └── assets/
│       └── images/        # Application images
├── styles/                # Global styles and Tailwind config
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/flavory` |
| `NEXTAUTH_URL` | NextAuth callback URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth JWT secret | Generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_BASE_URL` | Public application URL | `http://localhost:3000` |

---

## 📋 Future Enhancements

- 🍳 **Recipe Management**: Add, edit, and delete personal recipes
- 👥 **Social Features**: Follow other users and share favorite recipes
- 🔍 **Advanced Search**: Filter recipes by ingredients, cuisine, difficulty
- ⭐ **Rating System**: Rate and review recipes
- 🏆 **Achievement System**: Gamify the cooking experience
- 📱 **Mobile App**: React Native companion app

---

## 🙏 Acknowledgments

- **Next.js Team** for the incredible framework
- **MongoDB** for the robust database solution
- **NextAuth.js** for seamless authentication
- **Tailwind CSS** for beautiful, responsive styling
- **Vercel** for effortless deployment

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/aihridoy/flavory/issues)
- **Developer**: [@aihridoy](https://github.com/aihridoy)
- **Live Demo**: [https://flavory-phi.vercel.app](https://flavory-phi.vercel.app)

---

**Happy Cooking with Flavory! 🍽️✨**