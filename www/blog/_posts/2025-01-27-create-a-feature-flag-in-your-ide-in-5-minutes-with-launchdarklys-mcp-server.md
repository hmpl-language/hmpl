---
layout: post
title: "Create a Feature Flag in Your IDE in 5 Minutes with LaunchDarkly's MCP Server"
date: 2025-01-27 2:10 PM
categories: blog
---

Hello everyone! In this article, I'll show you how to create, evaluate, and modify feature flags directly from within your IDE using natural language with LaunchDarkly's new MCP server. This tutorial will guide you through the step-by-step process to get started with feature flag management right in your development environment.

## What is MCP and Why Use It?

**Model-context protocol (MCP)** is an open protocol that lets you interact with APIs using natural language. LaunchDarkly's MCP server is powered by Speakeasy, a developer tool for generating SDKs, documentation, and agent tools.

The beauty of using MCP for feature flags is that you can manage your flags without context switching between your IDE and the LaunchDarkly dashboard. This saves time and mental energy, helping you ship features faster.

## Prerequisites

Before we begin, make sure you have:

* A LaunchDarkly account (sign up for a free one [here](https://launchdarkly.com))
* The Cursor IDE installed on your local machine (though this works with any AI client that supports MCP)
* A JavaScript runtime that supports ECMAScript 2020 or newer (Node.js v18+, Bun v1+, or Deno 1.39+)

## Setting Up Your LaunchDarkly API Access Token

First, you'll need to create a LaunchDarkly API access token with appropriately scoped permissions.

1. Go to the [LaunchDarkly Authorization page](https://app.launchdarkly.com/settings/authorization)
2. Click **Create token**
3. Give your token a memorable name like "My MCP Server"
4. Set the Role to **Writer**
5. Leave the service token box unchecked (personal API token is better for local MCP server)
6. Keep the API version set to the most recent version (currently `20240415`)

After creating your API token, copy it to your clipboard - you'll need it for the next step.

## Installing the MCP Server

Here's the configuration you need to add to your Cursor settings:

**Settings > Cursor Settings > MCP > Add a new MCP server**

```json
{
  "mcpServers": {
    "LaunchDarkly": {
      "command": "npx",
      "args": [
        "-y", "--package", "@launchdarkly/mcp-server", "--", "mcp", "start",
        "--api-key", "api-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      ]
    }
  }
}
```

Replace `api-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` with your actual LaunchDarkly API access token.

**For EU or Federal users**, you'll need to add a `server-url` argument:

```json
{
  "mcpServers": {
    "LaunchDarkly": {
      "command": "npx",
      "args": [
        "-y", "--package", "@launchdarkly/mcp-server", "--", "mcp", "start",
        "--api-key", "api-xxxxxxx",
        "--server-url", "<host>"
      ]
    }
  }
}
```

Replace `<host>` with your specific host URL.

## Creating Your First Feature Flag

Now the fun begins! Toggle Cursor's AI pane and try asking the agent to create a flag:

> _create a feature flag to gate my awesome new feature_

The agent will likely respond with something like:

> _To create a feature flag for your awesome new feature, I'll need to know which LaunchDarkly project you want to add the flag to. Could you please provide the project key (the unique identifier for your LaunchDarkly project)? If you have a preferred flag key or description, let me know as well, or I can generate them for you!_

The MCP protocol is forgiving - you don't have to get prompts perfect on the first try. Simply provide your project name and the agent will handle the rest.

**Important**: Click **Run tool** in your AI pane every time the agent attempts to interact with the LaunchDarkly API. MCP servers require explicit approval before calling external APIs as a security measure.

## Managing Feature Flags

Once your flag is created, you can perform various operations:

### Checking Flag Status

Ask the AI agent:
> _what is the value of the awesome-new-feature flag?_

### Enabling a Flag

> _Turn the awesome new feature flag ON, serving True to all users._

### Adding Targeting Rules

For more complex scenarios, you can create targeting rules:

> _For the awesome new feature flag, update the targeting rules so the flag is only enabled and serving true for users who have email addresses ending with `launchdarkly.com`. Everyone else should get the false variation._

### Evaluating Flags

You can evaluate flags with specific contexts:

> _Evaluate the awesome new feature flag using the following context:_ 
> `{"name": "tilde", "email": "tthurium@launchdarkly.com"}`

Or in natural language:

> _Evaluate the value of Awesome New Feature flag with a context where the user has an email address `foo@bar.com`_

## Common Operations

Here's a quick reference for common feature flag operations:

| Task | Prompt |
|------|--------|
| Disabling a feature flag | Turn the `$FEATURE_FLAG_KEY` flag off |
| Updating flag description | Update the `$FEATURE_FLAG_KEY` flag description: "When enabled, show the updated UI for my awesome new feature." |
| Listing all flags | Show me all the feature flags in the `$PROJECT_KEY` project |
| Getting flag details | Tell me about my `$FEATURE_FLAG_KEY` feature flag |
| Adding individual targets | Add a new targeting rule for the `$FEATURE_FLAG_KEY` feature flag so that the user `tthurium@launchdarkly.com` receives the true variation |
| Copying a flag | Create a new feature flag that copies the configuration of the `$FEATURE_FLAG_KEY` flag, but add V2 to the flag key |
| Archiving a flag | Archive the feature flag `$FEATURE_FLAG_KEY` |
| Deleting a flag | Delete the feature flag `$FEATURE_FLAG_KEY` |

## Benefits of Using MCP for Feature Flags

Using MCP for feature flag management offers several advantages:

1. **No Context Switching**: Manage flags directly from your IDE
2. **Natural Language Interface**: Use plain English to interact with your flags
3. **Security**: Explicit approval required for API calls
4. **Integration**: Works with any AI client that supports MCP
5. **Time Saving**: Faster flag management without leaving your development environment

## Conclusion

In this tutorial, you learned how to create and manage feature flags from within your IDE using LaunchDarkly's MCP server. This approach can significantly improve your development workflow by eliminating context switching and providing a natural language interface for flag management.

The LaunchDarkly MCP server is currently in beta, so stay tuned for updates as more functionality is added. This tool represents a step forward in making feature flag management more accessible and integrated into the developer experience.

If you enjoyed this tutorial, you might also be interested in:

* [Getting started with the LaunchDarkly REST API](https://docs.launchdarkly.com/reference/api)
* [Customizing user experiences using FastAPI and LaunchDarkly segment targeting](https://docs.launchdarkly.com/guides/flags/segments)
* [A list of awesome MCP servers](https://github.com/modelcontextprotocol/awesome-mcp)

Thank you for following along! If you have any questions about using MCP with LaunchDarkly or want to share your experiences, feel free to reach out.

---

*This article is based on the original tutorial by Tilde A. Thurium for LaunchDarkly, available on [Dev.to](https://dev.to/annthurium/create-a-feature-flag-in-your-ide-in-5-minutes-with-launchdarklys-mcp-server-2jg).* 