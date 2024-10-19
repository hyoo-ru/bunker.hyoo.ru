namespace $ {

	export class $hyoo_bunker_actor extends $hyoo_crus_entity.with({

		Secrets: $hyoo_crus_list_ref_to( ()=> $hyoo_bunker_secret ),
		
	}){
		
		secrets( auto?: any ) {
			return this.Secrets( auto )?.remote_list() ?? []
		}
		
		@ $mol_action
		secret_make() {
			return this.Secrets( null )!.make({})
		}
		
	}
	
}
