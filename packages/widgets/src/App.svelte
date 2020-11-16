<script>
  export let myname;

  window.addEventListener("change-name", e => {
    console.log(e);
    if (typeof e.detail !== "undefined") {
      myname = e.detail.name;
    }
  });
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {myname}!</h1>
