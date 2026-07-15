# TanStack React Router Setup

## Folder Structure

```
src/
  routes/
    __root.jsx       # Root layout (wraps all pages)
    index.jsx        # Home page (/)
    about.jsx        # Example: About page (/about)
    contact.jsx      # Example: Contact page (/contact)
  routeTree.jsx      # Central route configuration (imports all routes)
  main.jsx           # App entry point (sets up router)
```

## How to Add New Routes

### 1. Create a new page file in `src/routes/`

For example, create `src/routes/about.jsx`:

```jsx
export const Route = {
  component: AboutPage,
}

export function AboutPage() {
  return <div>About Page</div>
}
```

### 2. Import and add the route to `src/routeTree.jsx`

Add this import at the top:
```jsx
import { AboutPage } from './routes/about'
```

Then add this route in the route tree creation:
```jsx
const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})
```

And add it to the children array:
```jsx
export const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])
```

## Nested Routes

For nested routes (e.g., `/dashboard/settings`), create a folder structure:

```
src/routes/
  dashboard/
    __layout.jsx     # Dashboard layout
    index.jsx        # Dashboard home (/dashboard)
    settings.jsx     # Settings page (/dashboard/settings)
```

Then import and configure them in `routeTree.jsx` with proper parent-child relationships.

## Linking Between Pages

Use the `Link` component from TanStack Router:

```jsx
import { Link } from '@tanstack/react-router'

export function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
```

## Route Parameters

### Dynamic route segments:

Create `src/routes/posts/$postId.jsx`:

```jsx
import { useParams } from '@tanstack/react-router'

export const Route = {
  component: PostPage,
}

export function PostPage() {
  const { postId } = useParams()
  return <div>Post ID: {postId}</div>
}
```

Add to routeTree:
```jsx
const postRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  component: PostPage,
})
```

## Useful Hooks

- `useNavigate()` - Programmatic navigation
- `useParams()` - Access route parameters
- `useSearch()` - Access query parameters
- `useLocation()` - Get current location info

See the [TanStack Router docs](https://tanstack.com/router/latest) for more details.
