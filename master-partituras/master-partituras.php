<?php
/*
Plugin Name: Master Musica - Partituras
Plugin URI: https://www.mastermusica.com.br
Description: Editor visual de partituras avançado. Suporta múltiplas pautas paralelas, quebra de compassos, Tom, Dinâmicas e mais.
Version: 3.7
Author: Master Musica
License: GPLv2 or later
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define constantes para facilitar os caminhos
define( 'MASTER_PARTITURAS_URL', plugin_dir_url( __FILE__ ) );
define( 'MASTER_PARTITURAS_DIR', plugin_dir_path( __FILE__ ) );

// 1. REGISTRAR SCRIPTS E ESTILOS
add_action( 'wp_enqueue_scripts', 'master_partituras_carregar_scripts' );
function master_partituras_carregar_scripts() {
    // Bibliotecas Externas (ABCJS)
    wp_register_style( 'abcjs-css', 'https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.2.2/abcjs-audio.min.css', array(), '6.2.2' );
    wp_register_script( 'abcjs-js', 'https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.2.2/abcjs-basic-min.js', array(), '6.2.2', true );

    // Arquivos Locais do Plugin
    wp_register_style( 'master-partituras-style', MASTER_PARTITURAS_URL . 'assets/css/style.css', array('abcjs-css'), '3.7' );
    wp_register_script( 'master-partituras-script', MASTER_PARTITURAS_URL . 'assets/js/script.js', array('abcjs-js'), '3.7', true );
}

// 2. SHORTCODE
add_shortcode( 'master_partitura', 'master_partituras_renderizar_app' );
function master_partituras_renderizar_app() {
    // Carrega os arquivos apenas quando o shortcode for usado na página
    wp_enqueue_style( 'master-partituras-style' );
    wp_enqueue_script( 'master-partituras-script' );

    ob_start();
    // Inclui o arquivo de template HTML
    include MASTER_PARTITURAS_DIR . 'templates/app-view.php';
    return ob_get_clean();
}