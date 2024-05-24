# Frontend project - Marmot Shop
This is a frontend demo website for e-commerce. It has a minimalist modern design, follwing modern websites's standard. Visit the live demo [here](https://marmotshop.yuankedev.fun).

## Introduction
The Marmot Shop is built using: 
- [React](https://react.dev/) for framework
- [Typescript](https://www.typescriptlang.org/) for programming language
- [Redux](https://redux.js.org/) for state management
- [React Router Dom](https://reactrouter.com/en/main) for router management
- [React Hook Form](https://react-hook-form.com/) for form control
- [TailwindCSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/), [Flowbite React](https://www.flowbite-react.com/) for styling
- [Dummyjson](https://dummyjson.com/) for demo API.

## Table of content
1. [Getting Started](#1-getting-started)
2. [Features](#2-features)
3. [Testing](#3-testing)
4. [Deployment](#4-deployment)

## 1 Getting start
```
git clone https://github.com/yuankeMiao/marmot-shop.git
```
Then install the dependencies:
```
cd marmot-shop
npm install
```

To start the development server:
```
npm start
```

To deploy it:
```
npm run build
```


## 2 Features

### 2.1 Routers and pages
This project uses [react-router-dom](https://reactrouter.com/en/main) for the client side router control. 

Component `<Outlet>` is used in this app to provide a universal header and footer. All other pages are wrapped in. In admin dashobord, Component `<Outlet>` is also used to wrap differnet managers.

### 2.2 For all viewers
Home page ('/'), all product page ('/all-product'), single product page('/product/:id), error page ('/*/**') are avaliable for all visitors. 

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/545a13ea-77f3-431f-8c75-1d74e57faed4)


#### 2.2.1 Navigation
The header is sticky to the window, so it will be always on top the the window. Navbar has three items, it will highlight the active one.

#### 2.2.2 Search feature
This is a button in header, click this button will open a modal with a search input field, type any text in the search field, after 1s stop, it will show the result. Click anywhere  outside the modal to close the modal.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/8bf79ba2-b2c9-44d8-9d53-7136651ab2fd)


#### 2.2.3 Dark mode
The toggle button on header will toggle a whole app theme change via useContext and TailwindCSS. However, it is worth to note that, useContext hook is not nessesary in this case, because TaiwindCSS reads localStorage for theme info then toggle different mode. This project is using a simple useContext mainly because the requirements of this assignment.

The toggle button also change from a sun icon to a moon icon when the theme changes from light to dark.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/374bf7b0-2621-4d4b-a01d-2b991463d198)


#### 2.2.4 Cart
Even non-authorized users can use the cart to store the products they want to add. There is a cart icon with number badge in header to show how many items in the cart. If the total item amount is more than 99, it will show "...".

Click that icon will navigate to cart page, users can check the items in cart, change the amount of an item or delete it. User cannot changed the amount less than 1 or more than stock.

But this data is stored in redrx state, so if client reload the app, cart state will be reset to empty.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/ce0325a4-0f9c-4c9e-9a8a-95e3b7f21af8)


#### 2.2.5 All products page
This page has two main components: Filter and DisplayProducts. In Filter, user can select category, price range, if in staock and sort by price, name and created date. 

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/09e81eef-2a6d-4e38-adbb-15329d104140)


#### 2.2.6 Amount control
In single priduct page and cart page, there is an amount control component, where user can increase, decrease or input the amount of product. If user input amount is more than stock, the amount will be set to the max avaliable number, and disable the buttom. There's also a tooltip to tell user the stock number.

#### 2.2.7 Login & Register
User can switch from login modal and register modal seamless.
Useer can only register as customer.Here's some login credentials you can use:
```
{
   // admin
   {
      "email": "yuanke@admin.com"
      "password": "yuank@123",
   },

   // user
   {
      "emal": "Anna.Salminen95@hotmail.com",
      "password": "Anna Salminen",
   },
}
```

You can get all users list in admin dashborad after you login admin acoount, and by default all the user'a password is the combination of firstname and lastname as the examplke shows. By this way, you can login as any customer. Or you can register you own account.

This app stores token in localStorage, so after user refresh the page, login status will be still valid.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/42d68cd1-0fca-4ba0-9a3f-e1f6e899b290)

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/5a40878e-e4f7-4ead-8149-483e7e1ceeb7)

### 2.3 For login users

#### 2.3.1 Order
After user log into the app, user can place an order in cart:

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/a3ccb688-7191-464a-9343-655ae18f0d91)


#### 2.3.2 Profile
Authorized user will have avatar on the roght corner of header, instead of login/register button. Clicke the avatar will trigger a dropdown menu with current user's name and email, profile link, and logout button.

In profile page, user can check basic info, check oerder history, manage address book (add, update, create), update user info, and logout. If user logout in profile page, it will show helper text to ask user login first.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/ee9f0e01-3cd7-4129-b049-4458ae810e59)

#### 2.3.3 Logout
Logout reducer action will empty the user state to null, and remove the token in localStorage. Then trigger a reload of the page. So after logout, user's cart state will be empty also.

### 2.4 For admin

For admin user, the dropdown menu in avatar has another link: Dashboard. In Dashboard page, admin can manage (create, update, delete) products, users,and orders in three routes, each one has it's own filter.

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/8f695dca-1317-46c6-ae7a-9d5ebfa24b89)

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/d53d6a48-ff2a-4898-85f3-1c2d0f3eba1b)

![image](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/f29a5f33-6a72-42e5-8e2b-8d3167aad7f8)


### 2.5 User experience
#### 2.5.1 Forms
This app has many forms, on top of the validation, all the input fields are using floating label, so the form is more campact and elegant. If an inpiut field failed with validation, the while outline will turn to red with help text, so user can easily know what to fill up.

#### 2.5.2 Scroll to Top
Whenever users navigate to a new page, the screen will automatically scroll to the top with a smooth behaviour.
There is also a scroll to top button in the right bottom corner, it is invisible when user is already on top, and show up when user scroll down more than 20px.

#### 2.5.3 Error/Loading page
If user get into an invalid route, like "/wrongpage", or"/product/nonexist", or loading user info. There will be a cute jumping marmot to tell users it is the wrong place, and provide a link to go back. Feel free to try it!


https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/7ea31eae-53b6-40ab-b92e-77d250d1c734


#### 2.5.4 Skeletons
Since the product data is the most important data in this app, so there is a skeleton component for the card. When loading is true, the page will render a nice looking pulsing skeleton in the same shape of real component.

![skeleton](https://github.com/yuankeMiao/fs17-Frontend-project/assets/109540749/8eac5b45-a7cd-460e-af67-ca2bccf952b4)

#### 2.5.5 Feedbacks
User will receive feedbacks after an action is succeed or failed, like a toast message or loading button.

### 2.6 Optimazation
Lighthouse performance score for pages: 86 ~ 91.
#### 2.6.1 RTKQ
Redux tookit query provides efficient data fetching and caching to improve the performance. With the usage of provideTags and invalidateTags, the app can refetch data automatically when certain data updated. Lazy fetching provides another way to manually trigger a fetch like in the search feature.

#### 2.6.2 Caching functions and calculations
For array functions, the component will recreate a new one for every render, so it is better to cache some functions that barely change between re-renders. For this app, bounce function is cached by useCallback(), the calculation result in pagination feature is also cached by useMemo().

#### 2.6.3 Lazy loading
To improve the loading speed, this app uses lazy loading for images and iframes like the hero image in home page and embedded google map in profile page.

### 2.7 Accessibility
Lighthouse accessibility score for pages: 98 ~ 100.

This app is fully accessible for screen readers. All the buttons. inputs and links have proper descriptive contents or aria-labels. Meaningful HTML5 tags like `<header />`, `<footer />`, `<section />`, `<nav />`, `<main />`  are well used.

## 3 Testing

Tests are written with Jest and React Testing library, using msw for mock server.

 To run the tests and check the coverage:
```
npm test
```

_Note: This project only tested redux logics, because some of the external libraries in components do not support the testing library._

## 4 Deployment
The Marmot Shop is deployed using [Hostinger](https://www.hostinger.com/).

You can view the live demo [here](https://marmotshop.yuankedev.fun/).
