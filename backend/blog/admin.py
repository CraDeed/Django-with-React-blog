from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at", "tag_list"]
    list_display_links = ["title"]

    # 이미지로 표시
    # def photo_tag(self, post):
    #     return mark_safe(f"<img src={post.photo.url} style='width: 100px;'/>")

    def get_queryset(self, request):  # 추가
        return super().get_queryset(request).prefetch_related("tags")

    def tag_list(self, obj):  # 추가
        return ", ".join(o.name for o in obj.tags.all())


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
