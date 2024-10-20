namespace $ {

	export class $hyoo_bunker_secret extends $hyoo_crus_entity.with({
		Parent: $hyoo_crus_atom_ref_to( ()=> $hyoo_bunker_secret ),
		Kids: $hyoo_crus_dict_to( $hyoo_crus_atom_ref_to( ()=> $hyoo_bunker_secret ) ),
		Value: $hyoo_crus_atom_str,
		Values: $hyoo_bunker_values,
		Description: $hyoo_crus_text,
	}){

		@ $mol_mem
		value( next?: string ) {
			return this.Value( next )?.val( next ) ?? ''
		}
		
		@ $mol_mem
		description( next?: string ) {
			return this.Description( next )?.text( next ) ?? ''
		}

		kid( path: string[], auto?: 'auto' ): $hyoo_bunker_secret | null | undefined {
			if( path.length == 0 ) return this

			const kid = this.Kids()?.key( path[0] )?.remote() 
				?? auto ? this.kid_make( path[0] ) : null
			
			return path.length == 1 ? kid : kid?.kid( path.slice( 1 ), auto )
		}

		@ $mol_mem_key
		kid_make( name: string ) {
			const ranks = $hyoo_bunker_ranks_from_land( this.land() )

			const secret = this.Kids(null)?.key( name, 'auto' ).ensure( ranks )
			secret?.Title(null)?.val( name )

			return secret
		}

		@ $mol_action
		join( lord: $hyoo_crus_ref, rank: $hyoo_crus_rank ) {

			const key = this.$.$hyoo_crus_glob.Node( lord, $hyoo_bunker_peer ).land().key()
			this.land().give( key, rank )
			this.Values()?.current()?.land().give( key, rank )

			this.Kids()?.keys().forEach( k => {
				this.Kids()?.key( k ).remote()?.join( lord, rank )
			} )

		}

		@ $mol_action
		deny( lord: $hyoo_crus_ref ) {

			const key = this.$.$hyoo_crus_glob.Node( lord, $hyoo_bunker_peer ).land().key()
			this.land().give( key, $hyoo_crus_rank.nil )
			this.Values()?.current()?.land().give( key, $hyoo_crus_rank.nil )
			this.Values()?.up()

			this.Kids()?.keys().forEach( k => {
				this.Kids()?.key( k ).remote()?.deny( lord )
			} )

		}

		@ $mol_mem
		ranks() {
			return $hyoo_bunker_ranks_from_land( this.land() )
		}

	}

}
