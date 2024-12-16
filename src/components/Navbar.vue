<script setup lang="ts">
import { Camera } from "lucide-vue-next"
import { ShoppingBasket } from "lucide-vue-next"
import { Bed } from "lucide-vue-next"
import { RouterLink } from "vue-router"
</script>

<template>
    <nav
        class="fixed start-0 top-0 z-20 w-full border-gray-200 bg-transparent backdrop-blur-[6px]"
    >
        <div
            class="container mx-auto flex flex-wrap items-center justify-between p-4"
        >
            <RouterLink
                to="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
            >
                <Bed :size="30" />
                <span
                    class="self-center whitespace-nowrap text-2xl font-semibold"
                    >Star Travel</span
                >
            </RouterLink>
            <div
                class="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse"
            >
                <button
                    type="button"
                    class="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <ShoppingBasket :size="30" />
                </button>
                <button
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400"
                >
                    <span class="sr-only">Open menu</span>
                    <svg
                        class="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>
            <div
                class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                id="navbar-sticky"
            >
                <ul
                    class="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
                >
                    <li>
                        <RouterLink
                            to="#"
                            class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                            >Home</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink
                            to="#"
                            class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                            >About</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink
                            to="#"
                            class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                            >Services</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink
                            to="#"
                            class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                            >Contact</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
