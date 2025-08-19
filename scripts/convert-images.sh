#!/bin/bash

# 图片格式转换脚本
# 支持转换为WebP和AVIF格式

echo "🖼️  图片格式转换工具"
echo "=================="

# 检查必要工具是否安装
check_dependencies() {
    if ! command -v magick &> /dev/null; then
        echo "❌ ImageMagick 未安装，请运行: brew install imagemagick"
        exit 1
    fi
    
    if ! command -v avifenc &> /dev/null; then
        echo "⚠️  libavif 未安装，AVIF转换将被跳过"
        echo "   要安装请运行: brew install libavif"
        AVIF_AVAILABLE=false
    else
        AVIF_AVAILABLE=true
    fi
}

# 转换为WebP
convert_to_webp() {
    local input_dir="$1"
    local output_dir="$2"
    local quality="${3:-85}"
    
    echo "🔄 转换为WebP格式 (质量: ${quality}%)"
    
    mkdir -p "$output_dir"
    
    for file in "$input_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
        if [[ -f "$file" ]]; then
            filename=$(basename "$file")
            name="${filename%.*}"
            
            echo "   转换: $filename → ${name}.webp"
            
            magick "$file" -quality $quality "$output_dir/${name}.webp"
            
            # 显示文件大小对比
            original_size=$(du -h "$file" | cut -f1)
            new_size=$(du -h "$output_dir/${name}.webp" | cut -f1)
            echo "   大小: $original_size → $new_size"
        fi
    done
}

# 转换为AVIF
convert_to_avif() {
    local input_dir="$1"
    local output_dir="$2"
    local quality="${3:-60}"
    
    if [[ "$AVIF_AVAILABLE" != true ]]; then
        echo "⏭️  跳过AVIF转换 (libavif未安装)"
        return
    fi
    
    echo "🔄 转换为AVIF格式 (质量: ${quality})"
    
    mkdir -p "$output_dir"
    
    for file in "$input_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
        if [[ -f "$file" ]]; then
            filename=$(basename "$file")
            name="${filename%.*}"
            
            echo "   转换: $filename → ${name}.avif"
            
            avifenc -q $quality "$file" "$output_dir/${name}.avif"
            
            # 显示文件大小对比
            original_size=$(du -h "$file" | cut -f1)
            new_size=$(du -h "$output_dir/${name}.avif" | cut -f1)
            echo "   大小: $original_size → $new_size"
        fi
    done
}

# 主函数
main() {
    check_dependencies
    
    # 设置路径
    CUBE_TEXTURES_DIR="../public/cube-textures"
    WEBP_OUTPUT_DIR="../public/cube-textures-webp"
    AVIF_OUTPUT_DIR="../public/cube-textures-avif"
    
    echo "📁 输入目录: $CUBE_TEXTURES_DIR"
    echo "📁 WebP输出: $WEBP_OUTPUT_DIR"
    echo "📁 AVIF输出: $AVIF_OUTPUT_DIR"
    echo ""
    
    # 检查输入目录
    if [[ ! -d "$CUBE_TEXTURES_DIR" ]]; then
        echo "❌ 输入目录不存在: $CUBE_TEXTURES_DIR"
        exit 1
    fi
    
    # 转换为WebP (质量85%)
    convert_to_webp "$CUBE_TEXTURES_DIR" "$WEBP_OUTPUT_DIR" 85
    echo ""
    
    # 转换为AVIF (质量60% - AVIF压缩率更高)
    convert_to_avif "$CUBE_TEXTURES_DIR" "$AVIF_OUTPUT_DIR" 60
    echo ""
    
    echo "✅ 转换完成！"
    echo ""
    echo "📊 目录大小对比:"
    echo "   原始: $(du -sh "$CUBE_TEXTURES_DIR" | cut -f1)"
    [[ -d "$WEBP_OUTPUT_DIR" ]] && echo "   WebP: $(du -sh "$WEBP_OUTPUT_DIR" | cut -f1)"
    [[ -d "$AVIF_OUTPUT_DIR" ]] && echo "   AVIF: $(du -sh "$AVIF_OUTPUT_DIR" | cut -f1)"
}

# 运行主函数
main "$@"
