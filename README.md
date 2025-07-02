# React Native Beauty Salon Booking App

## Project Overview

This is a comprehensive React Native application for booking beauty salon services. The app allows users to:

- Search for salons in their location
- Browse salon services and treatments
- Add services to cart and book appointments
- View and manage upcoming appointments
- Rate and review salons
- Chat with salons
- Manage their account

## Key Features

1. **Salon Search & Discovery**
   - Location-based salon search
   - Filtering by rating, price, and gender-specific services
   - Detailed salon information pages

2. **Booking System**
   - Service selection and cart functionality
   - Appointment scheduling with calendar and time slots
   - Booking management

3. **User Experience**
   - Customer reviews and ratings
   - In-app chat with salons
   - Account management
   - Guest checkout option

4. **Technical Features**
   - Context API for state management
   - AsyncStorage for local persistence
   - Custom UI components
   - Form validation
   - Responsive design

## Project Structure

The project follows a modular structure for better maintainability and scalability:

```
src/
├── components/          # Reusable UI components
├── context/             # Global state management
├── helpers/             # Utility functions
├── hooks/               # Custom hooks
├── navigation/          # App navigation setup
├── screens/             # Main app screens
├── theme/               # Design system (colors, typography)
├── types/               # TypeScript type definitions
└── utils/               # General utilities
```

## Technical Highlights

1. **State Management**
   - Uses React Context API for global state (cart, auth)
   - Local persistence with AsyncStorage

2. **Navigation**
   - Implemented with React Navigation
   - Type-safe navigation with TypeScript

3. **UI Components**
   - Custom reusable components (cards, lists, alerts)
   - Consistent design system (colors, typography)

4. **Code Quality**
   - TypeScript for type safety
   - Modular component structure
   - Custom hooks for reusable logic

## Scalability & Maintainability

1. **Modular Architecture**
   - Components are self-contained and reusable
   - Clear separation of concerns
   - Easy to add new features

2. **Type Safety**
   - TypeScript reduces runtime errors
   - Well-defined interfaces for data structures

3. **State Management**
   - Context API provides centralized state
   - Easy to extend with additional contexts

4. **Design System**
   - Centralized theme configuration
   - Consistent styling across components

5. **Navigation**
   - Type-safe routes prevent navigation errors
   - Easy to add new screens

## Demo Video

See the app in action: https://github.com/user-attachments/assets/1baf8afa-14ce-4cf8-9b84-33ca8ca9e8c0

## Getting Started

Follow the original setup instructions in the README to run the project locally.

## Conclusion

This beauty salon booking app demonstrates clean architecture, thoughtful state management, and a well-organized component structure. The use of TypeScript and modular design makes it maintainable and scalable for future enhancements.