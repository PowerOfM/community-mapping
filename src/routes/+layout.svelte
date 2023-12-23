<script lang="ts">
	import { ModeWatcher, setMode } from 'mode-watcher';
	import '../app.pcss';

	setMode('dark');
</script>

<ModeWatcher />
<slot />
