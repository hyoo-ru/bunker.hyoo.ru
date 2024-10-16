namespace $ {

	export class $hyoo_bunker_values extends $hyoo_crus_list_ref_to( ()=> $hyoo_crus_atom_str ) {

		@ $mol_mem
		current( auto?: any ) {
			const last = this.remote_list().at(-1)
			if( last ) return last

			if( auto === undefined ) return

			const ranks = $hyoo_bunker_ranks_from_land( this.land() )
			const first = this.make( ranks )
			return first
		}
		
		@ $mol_action
		up() {
			const cur = this.current()!
			if( cur === undefined ) return
			
			const ranks = $hyoo_bunker_ranks_from_land( cur.land() )

			const next = this.make( ranks )
			next?.val( cur.val() )
		}
		
	}

}
