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
            colors: {
                "dark-blue": "#162136",
                "dark-blue-secondary": "#263548",
                "normal-blue": "#2f4157",
                "border": "#2A3441",
                "black": "#071021",
                "black-secondary": "#010618",
                "light-blue": "#00a1ff",
                "light-blue-hover": "#008ecc",
                "danger": "#ff2e48"
            }
        },
    },

    plugins: [forms],
};
