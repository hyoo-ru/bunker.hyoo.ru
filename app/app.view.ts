namespace $.$$ {
	export class $hyoo_bunker_app extends $.$hyoo_bunker_app {
		
		@ $mol_mem
		actor() {
			return this.$.$hyoo_crus_glob.home( $hyoo_bunker_actor )
		}
		
		@ $mol_mem
		override spread_ids() {
			return this.actor().secrets().map( secret => secret.ref().description! )
		}
		
		override secret_new() {
			const secret = this.actor().secret_make()
			this.$.$mol_state_arg.go({ '': secret.ref().description! })
		}
		
		override secret( id: string ) {
			return this.$.$hyoo_crus_glob.Node( $hyoo_crus_ref(id), $hyoo_bunker_secret )
		}
		
	}
}
