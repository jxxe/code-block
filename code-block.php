<?php

/*
Plugin Name: Code Block
Plugin URI: https://github.com/jxxe/code-block
Description: A Gutenberg block for displaying code with syntax highlighting.
Version: 1.0
Author: Jerome Paulos
Author URI: https://jeromepaulos.com
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: code-block
Domain Path: /translations
*/

define( 'CODE_BLOCK_URL', plugins_url( 'code-block' ) );
define( 'CODE_BLOCK_DIR_PATH', plugin_dir_path( __FILE__ ) );

add_action( 'init', 'code_block_register_assets' );
function code_block_register_assets() {

    // Frontend Prism Theme (Tomorrow Night)
    wp_register_style(
        'code-block-frontend-styles',
        CODE_BLOCK_URL . '/theme.css',
        array( 'wp-edit-blocks' ),
        filemtime( CODE_BLOCK_DIR_PATH . 'theme.css' )
    );

    // Frontend JavaScript (Prism.js)
    wp_register_script(
        'code-block-frontend-script',
        CODE_BLOCK_URL . '/prism.min.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        filemtime( CODE_BLOCK_DIR_PATH . 'prism.min.js' )
    );

    // Editor Styles
    wp_register_style(
        'code-block-editor-styles',
        CODE_BLOCK_URL . '/editor.css',
        array( 'wp-edit-blocks' ),
        filemtime( CODE_BLOCK_DIR_PATH . 'editor.css' )
    );

    // Editor JavaScript
    wp_register_script(
        'code-block-editor-script',
        CODE_BLOCK_URL . '/code-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        filemtime( CODE_BLOCK_DIR_PATH . 'code-block.js' )
    );

    // Register Block
    register_block_type( 'jxxe/code-block', array(
        'style' => 'code-block-frontend-styles',
        'script' => 'code-block-frontend-script',
        'editor_style' => 'code-block-editor-styles',
        'editor_script' => 'code-block-editor-script'
    ) );

}