<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '#';
$image_url = $attributes['imageUrl'] ?? '';
$stats = is_array($attributes['stats'] ?? null) ? $attributes['stats'] : [];
$paragraphs = array_filter(array_map('trim', preg_split("/\n\s*\n/", $body)));
$wrapper = get_block_wrapper_attributes([
    'id' => 'company-overview',
    'class' => 'ctco',
]);
?>
<section <?php echo $wrapper; ?>>
    <div>
        <?php if ($label) : ?><div class="ctco__label"><?php echo esc_html($label); ?></div><?php endif; ?>
        <h2 class="ctco__title"><?php echo wp_kses_post(nl2br(esc_html($title))); ?></h2>
        <div class="ctco__body">
            <?php foreach ($paragraphs as $paragraph) : ?><p><?php echo esc_html($paragraph); ?></p><?php endforeach; ?>
        </div>
        <?php if ($button_text) : ?><a class="ctco__btn" href="<?php echo esc_url($button_url); ?>"><?php echo esc_html($button_text); ?></a><?php endif; ?>
    </div>
    <div>
        <div class="ctco__stats">
            <?php foreach ($stats as $stat) : ?>
                <div class="ctco__stat"><span class="ctco__big"><?php echo esc_html($stat['number'] ?? ''); ?></span><span class="ctco__stat-label"><?php echo esc_html($stat['label'] ?? ''); ?></span></div>
            <?php endforeach; ?>
        </div>
        <?php if ($image_url) : ?><img class="ctco__image" src="<?php echo esc_url($image_url); ?>" alt="" loading="lazy"><?php endif; ?>
    </div>
</section>
