<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
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
$wrapper = get_block_wrapper_attributes(['class' => 'ctcli']);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctcli__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctcli__title"><?php echo esc_html($title); ?></h2>
    <?php if ($body) : ?><p class="ctcli__body"><?php echo esc_html($body); ?></p><?php endif; ?>
    <div class="ctcli__logos">
        <?php foreach ($items as $item) : ?>
            <span class="ctcli__logo"><?php echo esc_html($item); ?></span>
        <?php endforeach; ?>
    </div>
</section>
