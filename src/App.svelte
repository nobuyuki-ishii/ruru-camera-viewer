<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import Date from './Date.svelte';
  import Calendar from './Calendar.svelte';
  import { ym, pics } from './stores';
  import 'luminous-lightbox/dist/luminous-basic.min.css';

  const title: string = "ルルカメラ";
  const api_url: string = "//141-lab.com/ruru_api/?ym=";

  // dateの更新で呼ばれる
  const unscribeYm: Unsubscriber = ym.subscribe(value => {
    let ymParam: string = $ym.replace('-', '');

    // 写真リストを取得
    fetch(api_url + ymParam)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      pics.set(data);
    })
    .catch(error => {
      console.log("api error.");
    });
  });
  onDestroy(unscribeYm);
</script>

<main>
  <div id="header" class="sticky-top bg-white mb-3">
    <h1>{title}</h1>
    <Date/>
  </div>
  <Calendar/>
</main>

<style>
</style>