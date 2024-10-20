namespace $ {

	export class $hyoo_bunker_cli extends $mol_object {

		@ $mol_mem
		_peer() {
			const peer = this.$.$hyoo_crus_glob.Node( $hyoo_crus_auth.current().lord(), $hyoo_bunker_peer )
			peer!.Title(null)!.val( peer!.ref().description )
			return peer
		}

		_secret( path: string, auto?: 'auto' ) {
			const [ root, ...keys ] = path.split('/')

			const ranks = {}
			const root_secret = this._peer()?.Secrets(null)?.key( root, 'auto' ).ensure( ranks )!
			if( !root_secret.Title()?.val() ) root_secret.Title(null)?.val( root )
			const secret = root_secret.kid( keys, auto )

			return secret
		}

		@ $mol_action
		add( name: string, ref: string ) {
			const secret = this.$.$hyoo_crus_glob.Node( $hyoo_crus_ref( ref ), $hyoo_bunker_secret )
			this._peer()?.Secrets(null)?.key( name, 'auto' ).remote( secret )
		}

		@ $mol_action
		get( path: string ) {
			const secret = this._secret( path )
			// console.log('secret', secret?.ref())
			const val = secret?.value()
			console.log( val )
			return val
		}

		@ $mol_action
		ref( path: string ) {
			const ref = this._secret( path )?.land().ref()
			console.log( ref )
			return ref
		}

		@ $mol_action
		put( path: string, value: string ) {
			return this._secret( path, 'auto' )?.value( value )
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
			const keys = path ? this._secret( path )?.Kids()?.keys() : this._peer()?.Secrets()?.keys()
			console.log( keys )
			return keys
		}

		@ $mol_action
		join( path: string, lord_str: string, rank_str: string ) {
			const lord = $hyoo_crus_ref( lord_str )
			const rank = $hyoo_crus_rank[ rank_str as keyof typeof $hyoo_crus_rank ]
			return this._secret( path )?.join( lord, rank )
		}

		@ $mol_action
		deny( path: string, lord_str: string ) {
			const lord = $hyoo_crus_ref( lord_str )
			return this._secret( path )?.deny( lord )
		}

		@ $mol_action
		peer() {
			const peer_ref = this._peer()?.land().ref()
			console.log( peer_ref )
			// const key = this._peer()?.land().key()
			// console.log('key', key?.toString())
			// console.log( this.$.$hyoo_crus_auth.current().public().toString() )
		}

		@ $mol_action
		ranks( path: string ) {
			const ranks = this._secret( path )?.ranks()
			console.log(ranks)
		}

		@ $mol_action
		auth( key: string ) {
			if( !key ) {
				console.log( this.$.$hyoo_crus_auth.current().toString() )
				return
			}

			const auth = this.$.$hyoo_crus_auth.from( key )
			this.$.$hyoo_crus_auth.current( auth )
		}

		@ $mol_mem
		_repl() {
			
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

				$mol_wire_async( this )._run( line.split( ' ' ) )
				
			})
			.on( 'SIGINT', () => process.exit(0) )
			.on( 'close', () => process.exit(0) )
	
			return terminal
		}

		@ $mol_action
		_run( [ cmd, ...args ]: string[] ) {
			;(this as any)[ cmd ]( ...args )
		}

		_start( ) {
			new $mol_wire_atom( '', ()=> this._auto() ).fresh()
			this._repl()
		}
		
		@ $mol_mem
		_auto() {
			const read = ( secret: $hyoo_bunker_secret ) => {
				secret?.can_change()
				try {
					secret.value()
					secret.Kids()?.keys().forEach( k => {
						try {
							const kid = secret.Kids()?.key( k ).remote()
							if( kid ) read( kid )
						} catch (error) {
							if( $mol_fail_catch( error ) ) console.log( error )
						}
					} )
				} catch (error) {
					if( $mol_fail_catch( error ) ) console.log( error )
				}
			}
			this._peer()?.Secrets()?.keys().forEach( k => {
				const secret = this._peer()?.Secrets()?.key( k ).remote()
				try {
					if( secret ) read( secret )
				} catch (error) {
					if( $mol_fail_catch( error ) ) console.log( error )
				}
			} )
		}
		
	}
	
}
