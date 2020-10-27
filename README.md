# TypeScript Github Repo Search
### This web app is based on my previous JavaScript implementation - [RepoSearch](https://github.com/KacperBiedka/RepoSearch).

## File & Folder structure

### Modules 
This project is using a modular approach. As the application grows different views and bigger segments are split into separate module folders for a clean structure. Inside the module folder the display page is separated from the components and containers. This approach provides a cleaner overview for the main view structure and routes. Components that are meant to be used in multiple modules are placed in the components folder in the root of the source directory.

### Testing utils, helper tools and services
Files stored in the root of the src directory are meant to be used throughout different modules, helper classes are structured in a way that allows for a flexible use. Inside of the API directory we can declare multiple helper classes for retrieving API data and combine data from multiple APIs. Additionally I've added a small [Fontawesome](https://github.com/FortAwesome/Font-Awesome) library declaration to lower the bundle size by importing separate icons. 

### Redux and React-Router
In this application the core of the redux integration is placed inside the root of the src folder. I've added basic support for redux middleware handling and combining multiple reducers. Route declaration are contained inside of an additional file and mapped based on the path to provide a cleaner overview of views in a project with a large number of pages.

### Scss modules
I've added some basic styling for the list and inputs using the scss modules. The selectors used inside of the components are assigned from the imported classes object. This ensures that we are using constants for the class selectors, allows for easy scoped styling and integration of the object in some of the tests.

## Data filtering and pagination
### Caching
An array containing previous search results is stored in the cache along with the current page and the number of rows that should be displayed per page. I've also added two helper functions that handle the basic steps required when operating on cache data (parsing and basic data validation)
### GithubApi class 
The GithubApi class is responsible for validating the search query and returning the search result in a unified way. The class has been structured to provide options for custom url, headers, query options and search parameters.
### Storing the results
In this case I've decided to use the local SearchResults component state to operate on the data. The methods declared in the container has been structured so that the logic can be extracted to a Context Provider as the Search Results module grows - I believe that for the requirments of the task using local state is sufficient.
### Url paremeters
I've added a custom react hook for extracting the data from the url search parameters. These values are retrieved during the initial component mount and updated with every filter / search query debounce change. This approach combined with cached values ensures that we get the same view after page refresh.

### Local pagination
Number of pages is calculated based on the total number of entries and number of entries per page. The row number used for table display is separated from the value synced with TableOptions input to provide a better user experience (not limiting the user from passing empty values and handling only the valid cases). 

## Redux store
In this case I've only passed the error message as the value to the global store, it's the main value that could be used to display dynamic content in different modules. For values like search results or search query a local state or a context provider seems like a better option since these values would most likely not be used in different modules.

## Tests
For this application I've integrated some basic unit test testing selector assignments, numbers of displayed elements, input value synchronisation and property updates. The test check both cases: when the data is not passed or an error occured and when the data is valid. For more optimal test structure an integration test should be added for the SearchResults component to test data fetching and its affect on the display of nested elements.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
