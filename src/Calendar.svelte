<script lang="ts">
	import { pics } from './stores';
	import { afterUpdate } from "svelte";
	import { LuminousGallery } from 'luminous-lightbox';

	// カレンダーのクラス 平日(1-5)、土(6)、日(0)
	const dayOfWeekClass: string[] = [
		'table-danger text-danger',
		'table-secondary',
		'table-secondary',
		'table-secondary',
		'table-secondary',
		'table-secondary',
		'table-primary text-primary'
	];

	// 画像の置いてあるurl
	const image_url: string = '//141-lab.com/ruru_api/images';

	// カレンダー描画後に呼ばれる
	afterUpdate(() => {
		// luminousの設定
		// caption のオプション（img 要素の alt 属性の値をキャプションに表示）
		const luminousOpts4 = {
			caption: (trigger: any) => {
				return trigger.querySelector('img').getAttribute('alt');
			},
			onOpen: () => {
				// ヘッダスタイルを無効にして、写真が全体に映るようにする
				document.querySelector('#header').classList.remove('sticky-top', 'bg-white', 'mb-3');
			},
			onClose: () => {
				// ヘッダスタイルを戻す
				document.querySelector('#header').classList.add('sticky-top', 'bg-white', 'mb-3');
			}
		} 

		const luminousGalleryElems2 = document.querySelectorAll('.zoom_list');
			if ( luminousGalleryElems2.length > 0 ) {
			//第3引数に caption のオプションを指定
			new LuminousGallery(luminousGalleryElems2, {}, luminousOpts4);
		}
	});

	// 写真のタイトル生成
	function makeCaption(fname: string): string {
		// yyyymmddhhmissをyyyy/mm/dd hh:mi:ssのルルに変換
		return fname.substring(0, 4) + '/' + fname.substring(4, 6) + '/' +  fname.substring(6, 8) + ' ' + fname.substring(8, 10) + ':' + fname.substring(10, 12) + ':' + fname.substring(12, 14) + 'のルル';
	}
</script>

<table class="table table-bordered">
	<tbody>
	{#if $pics != undefined}
		{#each $pics as pic, i}
			<tr>
				<td class="text-center day {dayOfWeekClass[Number(pic.dayOfWeek)]}">{pic.day}</td>
				<td>
				{#each pic.data as data}
					<a class="zoom_list" href="{image_url}/{data}">
						<img class="img-thumbnail thumbnail" src="{image_url}/{data}" alt="{makeCaption(data)}"/>
					</a>
				{/each}
				</td>
			</tr>
		{/each}
	{/if}
	</tbody>
</table>

<style>
	.day {
		width: 50px;
		height: 60px;
		vertical-align: middle;
	}

	.thumbnail {
		width: 50px;
		height: 50px;
	}

	a {
		text-decoration: none;
	}
</style>