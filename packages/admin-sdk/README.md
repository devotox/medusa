<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />
  </a>
</p>
<h1 align="center">
  @medusajs/admin-sdk
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://demo.medusajs.com/">Medusa Admin Demo</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
An open source composable commerce engine built for developers.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/medusajs/medusa">
    <img src="https://circleci.com/gh/medusajs/medusa.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Installation

```sh
yarn add -D @medusajs/admin-sdk
```

## CLI

The SDK comes with a CLI that can be used to build admin extensions.

```sh
admin-sdk build [options]
```

### Options

| Option       | Description                              | Default |
| ------------ | ---------------------------------------- | ------- |
| -w, --watch  | Build the extensions in watch mode       | false   |
| -m, --minify | Whether to minify the build using terser | true    |

## Types

The SDK exports types for various types of admin extensions. These can be imported as follows:

```tsx
import type { OrderWidgetProps, ExtensionConfig } from "@medusajs/admin-sdk"

const Widget = ({ order, notify }: OrderWidgetProps) => {
  return <div>Widget</div>
}

export const config: ExtensionConfig = {
  type: "widget",
  zone: "order.details",
}

export default Widget
```