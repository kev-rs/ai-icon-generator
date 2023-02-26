import { asset } from '@assets';

/* eslint-disable */
const info = [
  { title: 'Quick Feedback Loop' ,icon: asset.loop, description: 'Our icons will generate within a few seconds so you can continously fine-tune your prompt and icon options to find the icon that works best for you.'},
  { title: 'Customize Your Icon' ,icon: asset.customize, description: 'Our icons are fully customizable. You can change the color, size, and even the shape of the icon to fit your needs.'},
  { title: 'Download Your Icon' ,icon: asset.download, description: 'Once you are happy with your icon, you can download it in a variety of formats including SVG, PNG, and PDF.'},
  { title: 'Share Your Icon' ,icon: asset.share, description: 'You can share your icon with your friends and colleagues by copying the link to your icon.' },
  { title: 'Affordable Prices',icon: asset.dollar, description: 'Our icons are affordable and you can purchase as many as you need. We offer a variety of pricing options to fit your needs.' },
  { title: 'High Resolution',icon: asset.hd, description: 'Your icons are high resolution of 1024x1024 so you can modify them in your favorite image editor as needed.' }
]

const usersFeedback = [
  { name: 'John Doe', avatar: asset.userIcon, feedback: 'I love this icon generator. It is so easy to use and I can create icons in a matter of seconds.' },
  { name: 'Daria', avatar: asset.userIcon, feedback: 'I have been using this icon generator for a while now and I love it. It is so easy to use and I can create icons in a matter of seconds.' },
  { name: 'Rick Jame', avatar: asset.userIcon, feedback: 'Probably the most Based web app. I used this application to generate a profile picture icon for my discord profile and I love it.' },
  { name: 'Kev', avatar: asset.userIcon, feedback: 'The UI is easy to user and I like how it tracks all of my previous icons in a easy to find place.' },
  { name: 'Walter White', avatar: asset.userIcon, feedback: 'I needed a logo to use for my product, and this app was just what I needed' },
  { name: 'Tina Seibert', avatar: asset.userIcon, feedback: 'I enjoy generating icons. So many cool colors, shapes, and styles to choose!' }
]

const benefits = [
  { title: 'Save Money', src: asset.saveMoney, description: 'Hiring a designer to create custom icons can be expensive, especially if you need a large number of icons or want to make frequent updates. Our AI icon generator tool offers more affordable pricing.' },
  { title: 'Speed', src: asset.saveMoney, description: 'Hiring a designer, on the other hand, can take days or even weeks, especially if the designer is working on other projects at the same time. Our digital icon generator can create custom icons quickly, often in just a few seconds.' },
  { title: 'Customization', src: asset.saveMoney, description: 'Our icon generator tool offers a variety of customization options, including the ability to change the color, size, and shape of the icon. You can also add text to the icon to create a logo.' },
  { title: 'Easy to Use', src: asset.saveMoney, description: 'Our icon generator tool is easy to use. You can create custom icons in just a few clicks. You can also save your icons to your account so you can easily find them later.' },
]

export { info, usersFeedback, benefits };