<script lang="ts">
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';

	setMode('dark');
</script>

<ModeWatcher />
<Toaster />

<slot />
