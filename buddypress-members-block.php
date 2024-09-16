<?php
/**
 * Plugin Name:       Buddypress Members Block
 * Description:       A Members list of recently active, popular, and newest members with List, Grid and Carousel.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Wbcom Designs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       buddypress-members-block
 *
 * @package WbcomBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function wbcom_block_buddypress_members_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'wbcom_block_buddypress_members_block_block_init' );

/**
 * Enqueue Swiper.js and related assets for the BuddyPress Members Block.
 *
 * This function enqueues the Swiper CSS and JS files for use with the
 * BuddyPress Members Block on the frontend.
 */
function enqueue_buddypress_members_block_assets() {
	// Enqueue Swiper CSS.
	wp_enqueue_style( 'swiper', 'https://unpkg.com/swiper/swiper-bundle.min.css', array(), '9.4.1' );

	// Enqueue Swiper JS.
	wp_enqueue_script( 'swiper', 'https://unpkg.com/swiper/swiper-bundle.min.js', array(), '9.4.1', true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_buddypress_members_block_assets' );
