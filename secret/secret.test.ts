namespace $ {
	
	$mol_test({
		
		async 'Set and get value'( $ ) {

			const land = $.$hyoo_crus_glob.home().land()
			const secret = land.Node( $hyoo_bunker_secret ).Item('')

			await $mol_wire_async(secret).value( 'secret-value' )

			$mol_assert_equal( secret.value(), 'secret-value' )
			
		},
		
		async 'Set and get value in kid'( $ ) {

			const land = $.$hyoo_crus_glob.home().land()
			const secret = land.Node( $hyoo_bunker_secret ).Item('')

			const kid = (await $mol_wire_async(secret).kid( ['kid'], 'auto' ))!

			await $mol_wire_async(kid).value( 'kid-value' )

			$mol_assert_equal( kid.value(), 'kid-value' )
			
		},
		
		async 'Set and get value in deep kid'( $ ) {

			const land = $.$hyoo_crus_glob.home().land()
			const secret = land.Node( $hyoo_bunker_secret ).Item('')

			const kid = (await $mol_wire_async(secret).kid( ['kid1', 'kid2', 'kid3'], 'auto' ))!

			await $mol_wire_async(kid).value( 'kid3-value' )

			$mol_assert_equal( kid.value(), 'kid3-value' )
			
		},

	})
	
}
