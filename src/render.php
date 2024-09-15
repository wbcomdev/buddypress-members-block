<?php
/**
 * Render the BuddyPress Members Block
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Extract attributes passed from the block.
$block_title       = isset( $attributes['title'] ) ? $attributes['title'] : '';
$sort_type         = isset( $attributes['sortType'] ) ? $attributes['sortType'] : 'active';
$limit             = isset( $attributes['limit'] ) ? $attributes['limit'] : 10;
$avatar_size       = isset( $attributes['avatarSize'] ) ? $attributes['avatarSize'] : 100;
$avatar_radius     = isset( $attributes['avatarRadius'] ) ? $attributes['avatarRadius'] : 0;
$view_type         = isset( $attributes['viewType'] ) ? $attributes['viewType'] : 'list';
$members_per_row   = isset( $attributes['membersPerRow'] ) ? $attributes['membersPerRow'] : 4;
$row_spacing       = isset( $attributes['rowSpacing'] ) ? $attributes['rowSpacing'] : 15;
$column_spacing    = isset( $attributes['columnSpacing'] ) ? $attributes['columnSpacing'] : 15;
$inner_spacing     = isset( $attributes['innerSpacing'] ) ? $attributes['innerSpacing'] : 15;
$box_border_radius = isset( $attributes['boxBorderRadius'] ) ? $attributes['boxBorderRadius'] : 4;

// Get members from the BuddyPress API.
$endpoint = "/buddypress/v1/members?per_page={$limit}";
if ( $sort_type === 'active' ) {
	$endpoint .= '&type=active';
} elseif ( $sort_type === 'popular' ) {
	$endpoint .= '&type=popular';
} elseif ( $sort_type === 'newest' ) {
	$endpoint .= '&type=newest';
}

$response = wp_remote_get( rest_url( $endpoint ) );
if ( is_wp_error( $response ) ) {
	echo '<p>' . esc_html__( 'An error occurred while retrieving members.', 'buddypress-members-block' ) . '</p>';
	return;
}

$members = wp_remote_retrieve_body( $response );
$members = json_decode( $members, true );

// Check if members exist and handle empty case.
if ( empty( $members ) || ! is_array( $members ) ) {
	echo '<p>' . esc_html__( 'No members found.', 'buddypress-members-block' ) . '</p>';
	return;
}

?>
<div <?php echo esc_attr( get_block_wrapper_attributes() ); ?> 
	style="
		--members-per-row: <?php echo esc_attr( $members_per_row ); ?>;
		--row-spacing: <?php echo esc_attr( $row_spacing ); ?>px;
		--column-spacing: <?php echo esc_attr( $column_spacing ); ?>px;
		--avatar-size: <?php echo esc_attr( $avatar_size ); ?>px;
		--avatar-radius: <?php echo esc_attr( $avatar_radius ); ?>px;
		--inner-spacing: <?php echo esc_attr( $inner_spacing ); ?>px;
		--box-border-radius: <?php echo esc_attr( $box_border_radius ); ?>px;">
	<?php if ( $block_title ) : ?>
		<h2><?php echo esc_html( $block_title ); ?></h2>
	<?php endif; ?>

	<div class="bp-members-preview <?php echo esc_attr( $view_type ); ?>">
		<?php if ( $view_type === 'carousel' ) : ?>
			<div class="swiper">
				<div class="swiper-container">
					<div class="swiper-wrapper" slides-per-view="<?php echo esc_attr( $members_per_row ); ?>">
						<?php foreach ( $members as $member ) : ?>
							<div class="swiper-slide bp-member-item">
								<a href="<?php echo esc_url( $member['link'] ); ?>">
									<img src="<?php echo esc_url( $member['avatar_urls']['full'] ); ?>" 
										alt="<?php echo esc_attr( $member['name'] ); ?>" 
										class="bp-member-avatar avatar" />
								</a>
								<a href="<?php echo esc_url( $member['link'] ); ?>">
									<div class="bp-member-name"><?php echo esc_html( $member['name'] ); ?></div>
								</a>
							</div>
						<?php endforeach; ?>
					</div>
					<div class="swiper-button-next"></div>
					<div class="swiper-button-prev"></div>
				</div>
			</div>
		<?php else : ?>
			<?php foreach ( $members as $member ) : ?>
				<div class="bp-member-item">
					<a href="<?php echo esc_url( $member['link'] ); ?>">
						<img src="<?php echo esc_url( $member['avatar_urls']['full'] ); ?>" 
							alt="<?php echo esc_attr( $member['name'] ); ?>" 
							class="bp-member-avatar avatar" />
					</a>
					<a href="<?php echo esc_url( $member['link'] ); ?>">
						<div class="bp-member-name"><?php echo esc_html( $member['name'] ); ?></div>
					</a>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</div>
