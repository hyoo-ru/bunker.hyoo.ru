namespace $ {

	export class $hyoo_bunker_cli extends $mol_object {

		@ $mol_mem
		peer() {
			return this.$.$hyoo_crus_glob.home().hall_by( $hyoo_bunker_peer, {} )
		}

		secret( path: string, auto?: 'auto' ) {
			const [ root, ...keys ] = path.split('/')
			return this.peer()?.Secrets()?.key( root ).remote()?.kid( keys, auto )
		}

		@ $mol_action
		get( path: string ) {
			return this.secret( path )?.Values()?.current()?.val()
		}

		@ $mol_action
		put( path: string, value: string ) {
			return this.secret( path, 'auto' )?.Values(value)?.current(value)?.val( value )
		}

		@ $mol_action
		delete( path: string ) {
			const [ root_key, ...keys ] = path.split('/')
			if( keys.length === 0 ) {
				this.peer()?.Secrets()?.cut( root_key )
				return
			}

			const last = keys.pop()!
			const root = this.peer()?.Secrets()?.key( root_key ).remote()
			const parent = keys.length > 0 ? root?.kid( keys ) : root
			parent?.Kids()?.cut( last )
		}

		@ $mol_action
		list( path: string ) {
			if( path === '' ) return this.peer()?.Secrets()?.keys()
			return this.secret( path )?.Kids()?.keys()
		}

		@ $mol_action
		join( path: string, lord: $hyoo_crus_ref, rank: $hyoo_crus_rank ) {
			return this.secret( path )?.join( lord, rank )
		}

		@ $mol_action
		deny( path: string, lord: $hyoo_crus_ref ) {
			return this.secret( path )?.deny( lord )
		}
		
	}
	
}
