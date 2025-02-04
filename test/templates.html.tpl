<template data-name="svg-plus">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>
</template>

<template data-name="svg-eye">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
    </svg>
</template>

<template data-name="svg-pen">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
    </svg>
</template>

<template data-name="svg-trash">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
    </svg>
</template>

<template data-name="svg-refresh">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
    </svg>
</template>

<template data-name="svg-x">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
        />
    </svg>
</template>

<template data-name="mybutton">
    <button class="px-2 py-1 bg-slate-300/60 rounded hover:bg-slate-300 active:bg-slate-400/55 flex gap-2">
        {{ content }}
    </button>
</template>

<template data-name="refresh-button">
    <mybutton class="!bg-purple-400/50 hover:!bg-purple-400/75 active:!bg-purple-400/90">
        <svg-refresh></svg-refresh>
        {{ content }}
    </mybutton>
</template>

<template data-name="myli">
    <li>
        <span class="hover:underline hover:text-blue-600 hover:cursor-pointer active:text-blue-900">
            {{ content }}
        </span>
    </li>
</template>

<template data-name="mylist">
    <div class="bg-slate-200 px-3 py-2 rounded pr-16 relative">
        This is a {{ name }} list.
        <ul class="list-disc pl-6 mt-2">
            <myli>default item</myli>
            {{ items.forEach(item => write(`<myli>${item}</myli>`)) }}
        </ul>
        {{ content }}
        <mybutton
            class="!bg-red-300/50 hover:!bg-red-300/75 active:!bg-red-300 absolute right-1 top-1 !px-1"
            onclick="this.closest('div').remove()"
        >
            <svg-x class="!size-4"></svg-x>
        </mybutton>
    </div>
</template>

<template data-name="card">
    <div class="card bg-white shadow rounded">
        <div class="bg-slate-400/30 rounded-tr rounded-tl px-4 py-2 border-b border-b-slate-300/50">
            <div class="flex gap-4 justify-between">
                <h2>{{ title }}</h2>
                <div class="flex gap-2">
                    {{ actions }}
                </div>
            </div>
        </div>
        <div class="p-4">{{ body }}</div>
    </div>
</template>