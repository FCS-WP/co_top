<?php

defined('ABSPATH') || exit;

$items_text = $attributes['itemsText'] ?? '';
$items = [];

if (is_array($attributes['items'] ?? null)) {
    foreach ($attributes['items'] as $item) {
        if (is_scalar($item)) {
            $value = trim((string) $item);
            if ($value !== '') {
                $items[] = $value;
            }
        }
    }
}

if (empty($items)) {
    $items = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $items_text)));
}

if (empty($items)) {
    $items = ['Quartz Surface', 'Solid Surface', 'Sintered Stone', 'Kitchen Countertops', 'Wall Claddings', 'Custom Fabrication', 'Professional Installation'];
}

$loop_items = array_merge($items, $items);
$wrapper = get_block_wrapper_attributes(['class' => 'ctm']);
?>
<div <?php echo $wrapper; ?>>
    <div class="ctm__track">
        <?php foreach ($loop_items as $item) : ?>
            <span class="ctm__item"><?php echo esc_html($item); ?></span>
            <span class="ctm__dot">✦</span>
        <?php endforeach; ?>
    </div>
</div>
