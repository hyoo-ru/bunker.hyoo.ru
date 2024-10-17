namespace $ {

	export class $hyoo_bunker_cli extends $mol_object {

		@ $mol_mem
		_peer() {
			const peer = this.$.$hyoo_crus_glob.home().hall_by( $hyoo_bunker_peer, {} )
			peer!.Title(null)!.val( peer!.ref().description )
			return peer
		}
		
		@ $mol_mem
		root() {
			$mol_wire_solid()
			this._peer()?.Secrets()?.keys()
		}

		secret( path: string, auto?: 'auto' ) {
			const [ root, ...keys ] = path.split('/')
			const secret = this._peer()?.Secrets(null)?.key( root, 'auto' ).ensure( {} )?.kid( keys, auto )
			return secret
		}

		@ $mol_action
		get( path: string ) {
			const val = this.secret( path )?.value()
			console.log( val )
			return val
		}

		@ $mol_action
		put( path: string, value: string ) {
			this.secret( path, 'auto' )?.value( value )
			const val = this.secret( path )?.value()
			console.log( val )
			return this.secret( path, 'auto' )?.value( value )
		}

		@ $mol_action
		delete( path: string ) {
			const [ root_key, ...keys ] = path.split('/')
			if( keys.length === 0 ) {
				this._peer()?.Secrets()?.cut( root_key )
				return
			}

			const last = keys.pop()!
			const root = this._peer()?.Secrets()?.key( root_key ).remote()
			const parent = keys.length > 0 ? root?.kid( keys ) : root
			parent?.Kids()?.cut( last )
		}

		@ $mol_action
		list( path: string ) {
			const keys = path ? this.secret( path )?.Kids()?.keys() : this._peer()?.Secrets()?.keys()
			console.log( keys )
			return keys
		}

		@ $mol_action
		join( path: string, lord_str: string, rank_str: string ) {
			const lord = $hyoo_crus_ref( lord_str )
			const rank = $hyoo_crus_rank[ rank_str as keyof typeof $hyoo_crus_rank ]
			return this.secret( path )?.join( lord, rank )
		}

		@ $mol_action
		deny( path: string, lord_str: string ) {
			const lord = $hyoo_crus_ref( lord_str )
			return this.secret( path )?.deny( lord )
		}

		@ $mol_action
		peer() {
			const peer_ref = this._peer()?.land().ref()
			console.log( peer_ref )
		}

		@ $mol_action
		auth( key: string ) {
			const auth = this.$.$hyoo_crus_auth.from( key )
			this.$.$hyoo_crus_auth.current( auth )
		}

		@ $mol_action
		help( test: string ) {
			return test
		}

		@ $mol_action
		run( [ cmd, ...args ]: string[] ) {
			;(this as any)[ cmd ]( ...args )
		}
		
		@ $mol_mem
		repl() {
			
			const terminal = $node.readline.createInterface({
				input: process.stdin,
				output: process.stdout,
				history: [],
				tabSize: 4,
				prompt: '',
			})
			terminal.prompt()
			
			terminal
			.on( 'line', line => {
				
				if( !line.trim() ) return

				$mol_wire_async( this ).run( line.split( ' ' ) )
				
			})
			.on( 'SIGINT', () => process.exit(0) )
			.on( 'close', () => process.exit(0) )
	
			return terminal
		}
		
	}
	
}
