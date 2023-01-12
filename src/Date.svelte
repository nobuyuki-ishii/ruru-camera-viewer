<script lang="ts">
	import { ym } from './stores';

	function next(): void {
		// 1ヶ月後
		ymCalc(1);
	}

	function prev(): void {
		// 1ヶ月前
		ymCalc(-1);
	}

	// yyyy-mmにxヶ月を加算
	function ymCalc(addM: number): void {
		let ymWk: string[] = $ym.split('-');
		let y: number = Number(ymWk[0]);
		let m: number = Number(ymWk[1]) + addM;

		if (m == 13) {
			// 年またぎ
			y++;
			m = 1;
		} else if (m == 0) {
			// 年またぎ
			y--;
			m = 12;
		}

		// yyyy-mm形式にする
		ym.set(String(y) + '-' + ('0' + String(m)).slice(-2));
	}
</script>

<input type="button" class="btn btn-light" value="&lt;" on:click={prev}>
<input type="month" bind:value={$ym}>
<input type="button" class="btn btn-light" value="&gt;" on:click={next}>

<style>

</style>