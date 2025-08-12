# Fishing Charter Marketplace - Project Structure

This document provides an overview of the project structure and architecture for the Fishing Charter Marketplace.

## Overall Architecture

The project follows a modern full-stack architecture with:

- **Backend**: Laravel 10 API (PHP 8.1+)
- **Frontend**: Vue.js 3 SPA (TypeScript)
- **Database**: PostgreSQL
- **Authentication**: Laravel Sanctum + OAuth
- **Payments**: Stripe Integration
- **File Storage**: Local/AWS S3
- **Real-time**: Pusher (optional)

## Directory Structure

```
project/
├── backend/                 # Laravel API Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/     # API Controllers
│   │   │   └── Middleware/  # Custom Middleware
│   │   ├── Models/          # Eloquent Models
│   │   └── Services/        # Business Logic Services
│   ├── database/
│   │   ├── migrations/      # Database Migrations
│   │   └── seeders/         # Database Seeders
│   ├── routes/
│   │   └── api.php          # API Routes
│   ├── config/              # Configuration Files
│   └── storage/             # File Storage
├── frontend/               # Vue.js Frontend
│   ├── src/
│   │   ├── components/     # Vue Components
│   │   ├── views/          # Page Components
│   │   ├── stores/         # Pinia Stores
│   │   ├── router/         # Vue Router
│   │   ├── services/       # API Services
│   │   └── utils/          # Utility Functions
│   ├── public/             # Static Assets
│   └── dist/               # Build Output
├── docs/                   # Documentation
└── docker/                 # Docker Configuration
```

## Backend Structure (Laravel)

### Models

The application uses the following Eloquent models:

#### User Model
- **Purpose**: Core user management with role-based access
- **Roles**: angler, operator, crew, admin
- **Key Features**: 
  - Role-based permissions
  - Profile management
  - Authentication tokens
  - Relationships with other entities

#### Charter Model
- **Purpose**: Fishing charter listings
- **Key Features**:
  - Location-based search
  - Pricing management
  - Availability tracking
  - Image management
  - Rating system

#### Booking Model
- **Purpose**: Charter booking management
- **Key Features**:
  - Date/time management
  - Payment integration
  - Status tracking
  - Capacity management

#### CrewPost Model
- **Purpose**: Crew job postings
- **Key Features**:
  - Job requirements
  - Salary information
  - Location-based search
  - Application management

#### CrewApplication Model
- **Purpose**: Crew job applications
- **Key Features**:
  - Application status tracking
  - Document uploads
  - Communication history

#### Message Model
- **Purpose**: User messaging system
- **Key Features**:
  - Direct messaging
  - Booking-related messages
  - Application-related messages
  - Read status tracking

#### Review Model
- **Purpose**: Rating and review system
- **Key Features**:
  - Multi-type reviews (charter, crew, operator)
  - Rating breakdowns
  - Image attachments
  - Verification system

### Controllers

#### AuthController
- User registration and login
- OAuth integration (Google, Facebook)
- Profile management
- Password reset functionality

#### CharterController
- CRUD operations for charters
- Search and filtering
- Image management
- Availability checking

#### BookingController
- Booking creation and management
- Payment processing
- Status updates
- Cancellation handling

#### CrewController
- Crew post management
- Application processing
- Search and filtering
- Status updates

#### MessageController
- Message sending and retrieval
- Conversation management
- Read status updates

#### ReviewController
- Review creation and management
- Rating calculations
- Moderation features

### Middleware

#### CheckRole Middleware
- Role-based access control
- Route protection
- Permission validation

### Database Migrations

The database schema includes:

1. **users** - User accounts and profiles
2. **charters** - Charter listings
3. **bookings** - Booking records
4. **crew_posts** - Crew job postings
5. **crew_applications** - Job applications
6. **messages** - User messages
7. **reviews** - Ratings and reviews

## Frontend Structure (Vue.js)

### Components

#### Layout Components
- **AppHeader** - Navigation and user menu
- **AppFooter** - Footer information
- **AppSidebar** - Sidebar navigation

#### Authentication Components
- **LoginForm** - User login
- **RegisterForm** - User registration
- **ProfileForm** - Profile management

#### Charter Components
- **CharterList** - Charter listings
- **CharterCard** - Individual charter display
- **CharterDetail** - Detailed charter view
- **CharterForm** - Charter creation/editing

#### Booking Components
- **BookingForm** - Booking creation
- **BookingList** - User bookings
- **BookingDetail** - Booking details

#### Crew Components
- **CrewPostList** - Job listings
- **CrewPostCard** - Individual job display
- **ApplicationForm** - Job application
- **ApplicationList** - Application management

#### Messaging Components
- **MessageList** - Conversation list
- **MessageThread** - Individual conversation
- **MessageForm** - Message composition

#### Review Components
- **ReviewForm** - Review creation
- **ReviewList** - Review display
- **RatingDisplay** - Rating visualization

### Stores (Pinia)

#### AuthStore
- User authentication state
- Token management
- Profile information

#### CharterStore
- Charter data management
- Search and filtering
- Booking state

#### BookingStore
- Booking management
- Payment processing
- Status tracking

#### CrewStore
- Crew post management
- Application processing
- Search functionality

#### MessageStore
- Message state management
- Conversation handling
- Real-time updates

#### ReviewStore
- Review management
- Rating calculations
- Moderation features

### Services

#### ApiService
- HTTP client configuration
- Request/response handling
- Error management

#### AuthService
- Authentication API calls
- Token management
- OAuth integration

#### CharterService
- Charter API operations
- Search functionality
- Image handling

#### BookingService
- Booking API operations
- Payment integration
- Status management

#### CrewService
- Crew API operations
- Application management
- Document handling

#### MessageService
- Message API operations
- Real-time messaging
- File attachments

#### ReviewService
- Review API operations
- Rating management
- Moderation features

## API Endpoints

### Public Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/charters` - Charter listings
- `GET /api/crew-posts` - Crew job listings

### Protected Endpoints
- `GET /api/user` - User profile
- `PUT /api/user/profile` - Update profile
- `POST /api/charters` - Create charter (operators)
- `POST /api/bookings` - Create booking (anglers)
- `POST /api/crew-applications` - Apply for job (crew)

### Admin Endpoints
- `GET /api/admin/users` - User management
- `GET /api/admin/charters` - Charter management
- `PUT /api/admin/users/{user}/verify` - Verify users

## Security Features

### Authentication
- Laravel Sanctum for API authentication
- OAuth integration (Google, Facebook)
- Role-based access control
- Password hashing and validation

### Authorization
- Custom middleware for role checking
- Route-level permissions
- Resource-level access control

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## Performance Considerations

### Backend
- Database indexing for search queries
- Eager loading for relationships
- Caching for frequently accessed data
- Pagination for large datasets

### Frontend
- Component lazy loading
- Image optimization
- API response caching
- Progressive loading

## Scalability Features

### Database
- Proper indexing strategy
- Query optimization
- Connection pooling
- Read replicas (production)

### Application
- Stateless API design
- Horizontal scaling support
- Queue system for background jobs
- File storage abstraction

### Infrastructure
- Docker containerization
- Load balancer support
- CDN integration
- Monitoring and logging

## Development Workflow

### Backend Development
1. Create migrations for schema changes
2. Update models with relationships
3. Implement controllers with validation
4. Add routes to API
5. Test with API client

### Frontend Development
1. Create Vue components
2. Implement Pinia stores
3. Add API service methods
4. Update routing
5. Test with browser

### Testing Strategy
- Unit tests for models and services
- Feature tests for API endpoints
- Component tests for Vue components
- E2E tests for critical user flows

## Deployment Considerations

### Environment Configuration
- Separate configs for dev/staging/prod
- Environment-specific database settings
- API key management
- SSL certificate configuration

### Database Migration
- Zero-downtime migrations
- Backup strategies
- Rollback procedures
- Data seeding for testing

### Monitoring and Logging
- Application performance monitoring
- Error tracking and alerting
- User activity logging
- Security event monitoring
