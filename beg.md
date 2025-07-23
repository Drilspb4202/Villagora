2025-Jul-10 15:41:35.175342
Starting deployment of Drilspb4202/git-github.com-Drilspb4202-Vilagora-main:main to localhost.
2025-Jul-10 15:41:35.340645
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.8.
2025-Jul-10 15:41:36.763680
Image not found (a8ogwcw04cckcg4skk4s80sk:09788b270932d0cd6bcb3ded50472cd4366e2029). Building new image.
2025-Jul-10 15:41:36.766297
----------------------------------------
2025-Jul-10 15:41:36.768503
Importing Drilspb4202/git-github.com-Drilspb4202-Vilagora-main:main (commit sha HEAD) to /artifacts/n0osg80cscsgo40css80cwg8.
2025-Jul-10 15:41:42.217532
Generating nixpacks configuration with: nixpacks plan -f toml  /artifacts/n0osg80cscsgo40css80cwg8
2025-Jul-10 15:41:42.531787
Found application type: node.
2025-Jul-10 15:41:42.535136
If you need further customization, please check the documentation of Nixpacks: https://nixpacks.com/docs/providers/node
2025-Jul-10 15:41:43.192326
----------------------------------------
2025-Jul-10 15:41:43.195333
Building docker image started.
2025-Jul-10 15:41:43.197470
To check the current progress, click on Show Debug Logs.
2025-Jul-10 15:41:47.610677
Oops something is not okay, are you okay? 😢
2025-Jul-10 15:41:47.613931
#0 building with "default" instance using docker driver
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#1 [internal] load build definition from Dockerfile
2025-Jul-10 15:41:47.613931
#1 transferring dockerfile: 1.28kB done
2025-Jul-10 15:41:47.613931
#1 DONE 0.0s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1741046653
2025-Jul-10 15:41:47.613931
#2 DONE 0.6s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#3 [internal] load .dockerignore
2025-Jul-10 15:41:47.613931
#3 transferring context: 2B done
2025-Jul-10 15:41:47.613931
#3 DONE 0.0s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1741046653@sha256:ed406b77fb751927991b8655e76c33a4521c4957c2afeab293be7c63c2a373d2
2025-Jul-10 15:41:47.613931
#4 DONE 0.0s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#5 [internal] load build context
2025-Jul-10 15:41:47.613931
#5 transferring context: 150.29MB 1.7s done
2025-Jul-10 15:41:47.613931
#5 DONE 1.7s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#6 [stage-0  2/11] WORKDIR /app/
2025-Jul-10 15:41:47.613931
#6 CACHED
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
2025-Jul-10 15:41:47.613931
#7 CACHED
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
2025-Jul-10 15:41:47.613931
#8 CACHED
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Jul-10 15:41:47.613931
#9 CACHED
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#10 [stage-0  6/11] COPY . /app/.
2025-Jul-10 15:41:47.613931
#10 DONE 0.3s
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
#11 [stage-0  7/11] RUN --mount=type=cache,id=a8ogwcw04cckcg4skk4s80sk-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile
2025-Jul-10 15:41:47.613931
#11 0.740  ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json
2025-Jul-10 15:41:47.613931
#11 0.740
2025-Jul-10 15:41:47.613931
#11 0.740 Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
2025-Jul-10 15:41:47.613931
#11 0.740
2025-Jul-10 15:41:47.613931
#11 0.740     Failure reason:
2025-Jul-10 15:41:47.613931
#11 0.740     specifiers in the lockfile ({"@hookform/resolvers":"^3.9.1","@radix-ui/react-accordion":"latest","@radix-ui/react-alert-dialog":"latest","@radix-ui/react-aspect-ratio":"latest","@radix-ui/react-avatar":"latest","@radix-ui/react-checkbox":"latest","@radix-ui/react-collapsible":"latest","@radix-ui/react-context-menu":"latest","@radix-ui/react-dialog":"latest","@radix-ui/react-dropdown-menu":"latest","@radix-ui/react-hover-card":"latest","@radix-ui/react-label":"latest","@radix-ui/react-menubar":"latest","@radix-ui/react-navigation-menu":"latest","@radix-ui/react-popover":"latest","@radix-ui/react-progress":"latest","@radix-ui/react-radio-group":"latest","@radix-ui/react-scroll-area":"latest","@radix-ui/react-select":"latest","@radix-ui/react-separator":"latest","@radix-ui/react-slider":"latest","@radix-ui/react-slot":"latest","@radix-ui/react-switch":"latest","@radix-ui/react-tabs":"latest","@radix-ui/react-toast":"latest","@radix-ui/react-toggle":"latest","@radix-ui/react-toggle-group":"latest","@radix-ui/react-tooltip":"latest","autoprefixer":"^10.4.20","class-variance-authority":"^0.7.1","clsx":"^2.1.1","cmdk":"latest","date-fns":"latest","embla-carousel-react":"latest","input-otp":"latest","lucide-react":"^0.454.0","next":"15.2.4","next-cloudinary":"latest","next-themes":"latest","react":"^19","react-day-picker":"latest","react-dom":"^19","react-hook-form":"latest","react-resizable-panels":"latest","recharts":"latest","sonner":"latest","tailwind-merge":"^2.5.5","tailwindcss-animate":"^1.0.7","vaul":"latest","zod":"^3.24.1","@types/node":"^22","@types/react":"^19","@types/react-dom":"^19","postcss":"^8.5","tailwindcss":"^3.4.17","typescript":"^5"}) don't match specs in package.json ({"@stagewise-plugins/react":"^0.5.0","@stagewise/toolbar-next":"^0.5.0","@types/node":"^22","@types/react":"^19","@types/react-dom":"^19","postcss":"^8.5","tailwindcss":"^3.4.17","typescript":"^5","@hookform/resolvers":"^3.9.1","@radix-ui/react-accordion":"latest","@radix-ui/react-alert-dialog":"latest","@radix-ui/react-aspect-ratio":"latest","@radix-ui/react-avatar":"latest","@radix-ui/react-checkbox":"latest","@radix-ui/react-collapsible":"latest","@radix-ui/react-context-menu":"latest","@radix-ui/react-dialog":"latest","@radix-ui/react-dropdown-menu":"latest","@radix-ui/react-hover-card":"latest","@radix-ui/react-label":"latest","@radix-ui/react-menubar":"latest","@radix-ui/react-navigation-menu":"latest","@radix-ui/react-popover":"latest","@radix-ui/react-progress":"latest","@radix-ui/react-radio-group":"latest","@radix-ui/react-scroll-area":"latest","@radix-ui/react-select":"latest","@radix-ui/react-separator":"latest","@radix-ui/react-slider":"latest","@radix-ui/react-slot":"latest","@radix-ui/react-switch":"latest","@radix-ui/react-tabs":"latest","@radix-ui/react-toast":"latest","@radix-ui/react-toggle":"latest","@radix-ui/react-toggle-group":"latest","@radix-ui/react-tooltip":"latest","autoprefixer":"^10.4.20","class-variance-authority":"^0.7.1","clsx":"^2.1.1","cmdk":"latest","date-fns":"latest","embla-carousel-react":"latest","input-otp":"latest","lucide-react":"^0.454.0","next":"15.2.4","next-cloudinary":"latest","next-themes":"latest","react":"^19","react-day-picker":"latest","react-dom":"^19","react-hook-form":"latest","react-resizable-panels":"latest","recharts":"latest","sonner":"latest","tailwind-merge":"^2.5.5","tailwindcss-animate":"^1.0.7","vaul":"latest","zod":"^3.24.1"})
2025-Jul-10 15:41:47.613931
#11 ERROR: process "/bin/bash -ol pipefail -c pnpm i --frozen-lockfile" did not complete successfully: exit code: 1
2025-Jul-10 15:41:47.613931
------
2025-Jul-10 15:41:47.613931
> [stage-0  7/11] RUN --mount=type=cache,id=a8ogwcw04cckcg4skk4s80sk-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile:
2025-Jul-10 15:41:47.613931
0.740  ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json
2025-Jul-10 15:41:47.613931
0.740
2025-Jul-10 15:41:47.613931
0.740 Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
2025-Jul-10 15:41:47.613931
0.740
2025-Jul-10 15:41:47.613931
0.740     Failure reason:
2025-Jul-10 15:41:47.613931
0.740     specifiers in the lockfile ({"@hookform/resolvers":"^3.9.1","@radix-ui/react-accordion":"latest","@radix-ui/react-alert-dialog":"latest","@radix-ui/react-aspect-ratio":"latest","@radix-ui/react-avatar":"latest","@radix-ui/react-checkbox":"latest","@radix-ui/react-collapsible":"latest","@radix-ui/react-context-menu":"latest","@radix-ui/react-dialog":"latest","@radix-ui/react-dropdown-menu":"latest","@radix-ui/react-hover-card":"latest","@radix-ui/react-label":"latest","@radix-ui/react-menubar":"latest","@radix-ui/react-navigation-menu":"latest","@radix-ui/react-popover":"latest","@radix-ui/react-progress":"latest","@radix-ui/react-radio-group":"latest","@radix-ui/react-scroll-area":"latest","@radix-ui/react-select":"latest","@radix-ui/react-separator":"latest","@radix-ui/react-slider":"latest","@radix-ui/react-slot":"latest","@radix-ui/react-switch":"latest","@radix-ui/react-tabs":"latest","@radix-ui/react-toast":"latest","@radix-ui/react-toggle":"latest","@radix-ui/react-toggle-group":"latest","@radix-ui/react-tooltip":"latest","autoprefixer":"^10.4.20","class-variance-authority":"^0.7.1","clsx":"^2.1.1","cmdk":"latest","date-fns":"latest","embla-carousel-react":"latest","input-otp":"latest","lucide-react":"^0.454.0","next":"15.2.4","next-cloudinary":"latest","next-themes":"latest","react":"^19","react-day-picker":"latest","react-dom":"^19","react-hook-form":"latest","react-resizable-panels":"latest","recharts":"latest","sonner":"latest","tailwind-merge":"^2.5.5","tailwindcss-animate":"^1.0.7","vaul":"latest","zod":"^3.24.1","@types/node":"^22","@types/react":"^19","@types/react-dom":"^19","postcss":"^8.5","tailwindcss":"^3.4.17","typescript":"^5"}) don't match specs in package.json ({"@stagewise-plugins/react":"^0.5.0","@stagewise/toolbar-next":"^0.5.0","@types/node":"^22","@types/react":"^19","@types/react-dom":"^19","postcss":"^8.5","tailwindcss":"^3.4.17","typescript":"^5","@hookform/resolvers":"^3.9.1","@radix-ui/react-accordion":"latest","@radix-ui/react-alert-dialog":"latest","@radix-ui/react-aspect-ratio":"latest","@radix-ui/react-avatar":"latest","@radix-ui/react-checkbox":"latest","@radix-ui/react-collapsible":"latest","@radix-ui/react-context-menu":"latest","@radix-ui/react-dialog":"latest","@radix-ui/react-dropdown-menu":"latest","@radix-ui/react-hover-card":"latest","@radix-ui/react-label":"latest","@radix-ui/react-menubar":"latest","@radix-ui/react-navigation-menu":"latest","@radix-ui/react-popover":"latest","@radix-ui/react-progress":"latest","@radix-ui/react-radio-group":"latest","@radix-ui/react-scroll-area":"latest","@radix-ui/react-select":"latest","@radix-ui/react-separator":"latest","@radix-ui/react-slider":"latest","@radix-ui/react-slot":"latest","@radix-ui/react-switch":"latest","@radix-ui/react-tabs":"latest","@radix-ui/react-toast":"latest","@radix-ui/react-toggle":"latest","@radix-ui/react-toggle-group":"latest","@radix-ui/react-tooltip":"latest","autoprefixer":"^10.4.20","class-variance-authority":"^0.7.1","clsx":"^2.1.1","cmdk":"latest","date-fns":"latest","embla-carousel-react":"latest","input-otp":"latest","lucide-react":"^0.454.0","next":"15.2.4","next-cloudinary":"latest","next-themes":"latest","react":"^19","react-day-picker":"latest","react-dom":"^19","react-hook-form":"latest","react-resizable-panels":"latest","recharts":"latest","sonner":"latest","tailwind-merge":"^2.5.5","tailwindcss-animate":"^1.0.7","vaul":"latest","zod":"^3.24.1"})
2025-Jul-10 15:41:47.613931
------
2025-Jul-10 15:41:47.613931
2025-Jul-10 15:41:47.613931
1 warning found (use docker --debug to expand):
2025-Jul-10 15:41:47.613931
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Jul-10 15:41:47.613931
Dockerfile:20
2025-Jul-10 15:41:47.613931
--------------------
2025-Jul-10 15:41:47.613931
18 |     ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
2025-Jul-10 15:41:47.613931
19 |     COPY . /app/.
2025-Jul-10 15:41:47.613931
20 | >>> RUN --mount=type=cache,id=a8ogwcw04cckcg4skk4s80sk-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile
2025-Jul-10 15:41:47.613931
21 |
2025-Jul-10 15:41:47.613931
22 |     # build phase
2025-Jul-10 15:41:47.613931
--------------------
2025-Jul-10 15:41:47.613931
ERROR: failed to solve: process "/bin/bash -ol pipefail -c pnpm i --frozen-lockfile" did not complete successfully: exit code: 1
2025-Jul-10 15:41:47.613931
exit status 1
2025-Jul-10 15:41:47.617443
Deployment failed. Removing the new version of your application.
2025-Jul-10 15:41:47.971579
Gracefully shutting down build container: n0osg80cscsgo40css80cwg8