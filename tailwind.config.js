import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // screens: {
            //     'xs': '475px', // Custom extra small screen
            //     'sm': {'max': '640px'}, // Custom small screen (max-width: 639px)
            //     'md': {'max': '767px'}, // Custom medium screen (max-width: 767px)
            //     'lg': {'max': '1023px'}, // Custom large screen (max-width: 1023px)
            //     'xl': {'max': '1279px'}, // Custom extra large screen (max-width: 1279px)
            // },
        },
    },

    plugins: [forms],
};
