<a href="https://github.com/LexasCMS/ember-data-lexascms/actions">
  <img src="https://github.com/LexasCMS/ember-data-lexascms/workflows/CI/badge.svg" alt="CI Build Status" />
</a>

<a href="https://badge.fury.io/js/ember-data-lexascms">
  <img src="https://badge.fury.io/js/ember-data-lexascms.svg" alt="NPM Package Version" />
</a>


ember-data-lexascms
===============================================================

This is the officially supported addon for using the [LexasCMS](https://www.lexascms.com/) JSON:API content delivery API with [Ember Data](https://github.com/emberjs/data/).


Table of Contents
---------------------------------------------------------------

- [Why do I need this addon?](#why-do-i-need-this-addon)
- [Installation](#installation)
- [Usage](#usage)
  - [Configure Adapters and Serializers](#configure-adapters-and-serializers)
  - [Retrieving Image Fields](#retrieving-image-fields)
  - [Retrieving and Querying Content](#retrieving-and-querying-content)
  - [Setting the Request Context](#setting-the-request-context)
- [Contributing](#contributing)
- [License](#license)


Why do I need this addon?
---------------------------------------------------------------

While LexasCMS does natively support JSON:API and can be used with Ember Data without this addon, the addon defines some helpful defaults and provides predefined models in order to improve developer experience.

The addon currently provides the following:

- Preconfigured adapater/serializer
- Predefined model for retrieving `image` fields


Installation
---------------------------------------------------------------

```
ember install ember-data-lexascms
```


Usage
---------------------------------------------------------------

> You'll need a LexasCMS account before you can use this addon. If you don't have one already, you can [click here to create one](https://app.lexascms.com/signup).

After you've installed the addon, add the following config to your applications `config/environment.js` file.

```js
let ENV = {
  // ...

  lexascms: {
    spaceId: 'YOUR_LEXASCMS_SPACE_ID'
  }

  // ...
};
```

### Configure Adapters and Serializers

In order to have Ember Data pull content from LexasCMS, you'll also need to define some customer adapters and serializers.

If there are only specific models which are to be retrieved from LexasCMS, you'll need to define a custom adapter and serializer for each model.

The below examples defines an adapter and serializer for the `blog-post` model.

```js
// File: app/adapters/blog-post.js

import LexasCMSAdapter from 'ember-data-lexascms/adapters/lexascms';

export default class BlogPostAdapter extends LexasCMSAdapter {
}
```

```js
// File: app/serializers/blog-post.js

import LexasCMSSerializer from 'ember-data-lexascms/serializers/lexascms';

export default class BlogPostSerializer extends LexasCMSSerializer {
}
```

Alternatively, if all of your models are to be retrieved from LexasCMS, you can just define a custom application adapter and serializer. These will then be used for all of the models within your application.

```js
// File: app/adapters/application.js

import LexasCMSAdapter from 'ember-data-lexascms/adapters/lexascms';

export default class ApplicationAdapter extends LexasCMSAdapter {
}
```

```js
// File: app/serializers/application.js

import LexasCMSSerializer from 'ember-data-lexascms/serializers/lexascms';

export default class ApplicationSerializer extends LexasCMSSerializer {
}
```

### Retrieving Image Fields

In LexasCMS, image fields are treated as relationships. When defining a model which contains an image field, you should create a `belongsTo` relationship to the predefined `core-image` model.

The below example shows how you could define a `blog-post` model which contains an image field called `coverImage`:

```js
import Model, { attr, belongsTo } from '@ember-data/model';

export default class BlogPostModel extends Model {

  @attr slug;
  @attr title;
  @attr publishedAt;
  @attr excerpt;
  @attr mainContent;
  
  @belongsTo('author') author;
  @belongsTo('core-image') coverImage;

}
```

### Retrieving and Querying Content

Once you have completed the above steps and defined all of your models, you can retrieve content from LexasCMS using the regular Ember Data methods (`findAll`, `findRecord`, `query` etc.).

If you would like to apply filters or sorting options to your query, you can provide those options by using Ember Data's `query` method like so:

```js
this.store.query('blog-post', {

  // Fitering
  filter: {
    publishedAt: { _gte: '2020-01-01' }
  },

  // Sorting
  sort: '-publishedAt'
  
});
```

For further information on the available query options, please see the [full documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/) for the JSON:API content delivery API.

### Setting the Request Context

In the event that you would like to set a request context on your requests to LexasCMS (i.e. for content personalisation), you can call the `setRequestContext` method on the `lexascms` service.

This method can be called from anywhere within your application, and will automatically attach the provided context to all requests made to LexasCMS via Ember Data.

**Note:** You can also retrieve the current request context using the `getRequestContext` method on the `lexascms` service.

The following example shows how you could attach a request context from the `beforeModel` hook of your application route.

```js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

  @service lexascms;

  beforeModel() {
    this.lexascms.setRequestContext({
      audienceAttributes: {
        age: 25,
        location: 'GB'
      }
    });
  }

}
```


Contributing
---------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
---------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).