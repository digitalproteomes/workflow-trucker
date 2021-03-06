This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## notes

-   Regarding TypeScript and tsconfig.json https://stackoverflow.com/a/42097465/1616493
-   more complex FunctionComponent examples can be found here https://fettblog.eu/typescript-react/components/
-   deployment related https://create-react-app.dev/docs/deployment/
-   routing: use [nested routing?](https://reacttraining.com/react-router/web/guides/quick-start/2nd-example-nested-routing)
-   using typed function components [link](https://fettblog.eu/typescript-react/components/)

```
  type CardProps = {
  title: string,
  paragraph?: string  // the paragraph is optional
}

// No need to define the defaultProps property
export const Card: FunctionComponent<CardProps> = ({ title, paragraph = 'Hello World' }) =>
<aside>
  <h2>{ title }</h2>
  <p>
    { paragraph }
  </p>
</aside>

```

```
import { ElementOf } from './type';
export declare const PresetStatusColorTypes: ["success", "processing", "error", "default", "warning"];
export declare const PresetColorTypes: ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"];
export declare type PresetColorType = ElementOf<typeof PresetColorTypes>;
export declare type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>;

```

## packages.json

-   check outdated packages with `npm outdated`
-   update to the latest versin with `npm install <package>@latest`

## todos

-   typed css classes, so there is referencial integrity
-   use CDN for fast package downloads https://mobx.js.org/README.html

### done todos

-   use nameof workaround instead of magic strings https://schneidenbach.gitbooks.io/typescript-cookbook/nameof-operator.html
-   keyof magic // https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript

## Notes

        /**
         * filter by workflow tag
         *      library generation
         *      swat analysis
         *      sample preparation
         * used to filter 3 sample types and ms runs
         */
