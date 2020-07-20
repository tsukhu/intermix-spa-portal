import "./set-public-path";
import "alpinejs";
import singleSpaHtml from "single-spa-html";

declare global {
  interface Window {
    alpineData: (any) => any;
  }
}

window.alpineData = function() {
  return {
    title: "Alpine.js Landing Page",
    intro:
      'Implement a simple <code class="text-md text-pink-600">fetch()</code> request to render a list of items using Alpine.js :)',
    users: [],
    open: false,
    name,
  };
};

const htmlLifecycles = singleSpaHtml({
  template: (props) => `
  <section class="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 px-10 absolute h-75 overflow-y-auto" >
    <div class="w-full h-full text-gray-800"
      x-data="window.alpineData()"
      x-init="fetch('https://jsonplaceholder.typicode.com/users')
              .then(response => response.json())
              .then(data => users = data)">
      <h1 class="mt-0 mb-3 font-light text-3xl" x-text="title"><!-- title text --></h1>
      <p class="text-xl text-gray-600 font-light mb-4" x-html="intro"><!-- intro text --></p>
      <div class="flex flex-wrap -mx-2 pb-8">
        <!-- begin: user card -->
        <template x-for="user in users" :key="user.id">
          <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto font-light">
            <div class="flex bg-white rounded-lg shadow-md m-2 border-l-4 border-white hover:shadow-2xl hover:border-pink-500 cursor-pointer relative">
              <div class="p-4 pr-6 leading-normal">
                <div class="font-medium text-xl truncate" x-text="user.name"></div>
                <div class="truncate uppercase text-xs text-gray-500 font-semibold pb-2 tracking-widest" x-text="user.company.name"></div>
                <div class="" x-text="user.phone"></div>
                <a class="text-blue-600 hover:text-blue-700 mr-4 block" x-bind:href="'mailto:' + user.email" x-text="user.email"></a>     
                <a class="text-blue-600 hover:text-blue-700 block" x-bind:href="'https://' + user.website" x-text="user.website"></a>
              </div>
            </div>
          </div>
        </template>
        <!-- end: user card -->
      </div>
    </div>
  </section>
    `,
});

export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = (props) => {
  return htmlLifecycles.unmount(props);
};
