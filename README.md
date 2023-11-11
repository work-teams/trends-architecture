# vue-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Seleccion de opciones despues de utilizar firebase init
? Are you ready to proceed? Yes
? Which Firebase features do you want to set up for this directory? Press
 Space to select features, then Enter to confirm your choices. Hosting:  
Configure files for Firebase Hosting and (optionally) set up GitHub      
Action deploys

=== Project Setup

First, let's associate this project directory with a Firebase project.   
You can create multiple project aliases by running firebase use --add,   
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: usuarios-80f40   
(usuarios)
i  Using project usuarios-80f40 (usuarios)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory. 

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes  
? Set up automatic builds and deploys with GitHub? Yes
? File dist/index.html already exists. Overwrite? No
i  Skipping write of dist/index.html

i  Detected a .git folder at C:\Users\Jeanpiere Palacios\Documents\Github\trends-architecture
i  Authorizing with GitHub to upload your service account to a GitHub repository's secrets store.

Visit this URL on this device to log in:
https://github.com/login/oauth/authorize?client_id=89cf50f02ac6aaed3484&state=1068649996&redirect_uri=http%3A%2F%2Flocalhost%3A9005&scope=read%3Auser%20repo%20public_repo

Waiting for authentication...

+  Success! Logged into GitHub as JeanpierePalacios
Action required: Visit this URL to ensure access has been granted to the appropriate organization(s) for the Firebase CLI GitHub OAuth App:    
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
? For which GitHub repository would you like to set up a GitHub workflow?
 (format: user/repository) work-teams/trends-architecture
? Set up the workflow to run a build script before every deploy? Yes     
? What script should be run before every deploy? n

+  Created workflow file C:\Users\Jeanpiere Palacios\Documents\Github\trends-architecture\.github/workflows/firebase-hosting-pull-request.yml     
? Set up automatic deployment to your site's live channel when a PR is   
merged? No

i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
i  Action required: Push any new workflow file(s) to your repo

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!

+  ### Results
+  npm run build

> vue-front@0.1.0 build
> vue-cli-service build

All browser targets in the browserslist configuration have supported ES module.
Therefore we don't build two separate bundles for differential loading.  


⠹  Building for production...

 DONE  Compiled successfully in 4421ms                           23:17:14

  File                                 Size            Gzipped

  dist\js\chunk-vendors.0dbc221a.js    76.02 KiB       28.44 KiB
  dist\js\app.090426f7.js              15.36 KiB       9.33 KiB
  dist\css\app.b1066f51.css            0.91 KiB        0.40 KiB

  Images and other types of assets omitted.
  Build at: 2023-11-11T04:17:14.717Z - Hash: 2e06a37ecbd9136f - Time: 4421ms

 DONE  Build complete. The dist directory is ready to be deployed.
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
       
PS C:\Users\Jeanpiere Palacios\Documents\Github\trends-architecture> firebase deploy

=== Deploying to 'usuarios-80f40'...

i  deploying hosting
i  hosting[usuarios-80f40]: beginning deploy...
i  hosting[usuarios-80f40]: found 7 files in dist
+  hosting[usuarios-80f40]: file upload complete
i  hosting[usuarios-80f40]: finalizing version...
+  hosting[usuarios-80f40]: version finalized
i  hosting[usuarios-80f40]: releasing new version...
+  hosting[usuarios-80f40]: release complete
