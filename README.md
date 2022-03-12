# Description

The project is an example of a basic e-commerce app. It includes a perspective of a casual user(overlooking content) as well as a special perspective for Admin Profile(adding, removing or changing content on a website).

# Technologies

- ReactJS
- Typescript
- NextJS
- Redux
- SCSS
- MongoDB
- FireBase(Authentication)

#Run in a browser
https://now4czyk-reactshop.netlify.app/

# Run locally

Download the repository and type in terminal

```
npm install
npm run dev
```

# User Profile

### Logged out Perspective

Initially, users are not logged in. Therefore, they can use a website only for overlooking products.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/logged-out-perspetive.png)

> Logged Out Perspective

### Authentication Page

When users want to add products to a cart or a favorites list, they are redirected to the Authentication Page. Here, they are asked to sign in or create an account.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/authentication.png)

> Authentication Page

### Logged in Perspective

After succesful authentication users are redirected to the Main Page. Here, they can enjoy adding products to a cart or a favorites list.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/logged-in-perspective.png)

> Logged In Perspective

### Product Details Page

Each product has its dedicated page on which users can choose a size and a quantity of a product that they want to order.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/product-details.png)

> Product Details Page

### Cart

On Cart Page users can take a look at products they added to a cart. Here they are allowed to remove products or increase/decrease products' quantity.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/cart.png)

> Cart Page

Moreover, they can finish a purchase completing in a correct way Cart Form.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/cart-form.png)

> Cart Form

### Favorites

On Favorites Page users can take a look at products they added to a favorites list (by clicking heart next to a product's title). Additionally, they are allowed to remove products from the favorites list.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/favorites.png)

> Favorites Page

# Admin Profile

### Logging Into Admin Profile

To test the Admin Perspective you need to log in with the data:

```
email : admin@admin.com
password: admin12
```

### User Perspective View

User Perspective Page allows admin to take a look at the main page of a shop to observe the implementation of its changes.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/admin-perspective.png)

> Admin Profile: User Perspective Page

### Modification Page

Modification Page is a heart of Admin Profile. Here, admin is allowed to add a new product as well as change available one.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/modification-page.png)

> Modification Page

### Add a New Product

The section allows admin to add a new product to an offer. Due to visual aspects it is recommendable to paste an url to image with size: 800x1155px.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/add-a-new-product.png)

> Add a New Product

### Change Available PRoducts

The section allows admin to change products that are currently in an offer. However, there are 8 products in an offer that cannot be modified because they exists as dummy content. If there are no products that have button to edit/delete a product then you need to first add a product in the Add a New Product Section. Unfortunately, the process of posting a new products or applying changes to an exisitng product takes around 1,5min.

![](https://github.com/Now4czyk/ShopAppProject/blob/main/assets/change-exisitng-product.png)

> Change an Exisisting Product
