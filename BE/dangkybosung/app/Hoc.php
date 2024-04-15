<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Hoc extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'sotin' , 'tenhocphan', 'ky' , 'loai', 'diemdadat' , 'ghepvoilop','nam', 'id_sinh_vien', 'id_giao_vien', 'id_truong_khoa', 'check_giaovien', 'check_truongkhoa', 'ghichu', 'thoigian'
    ];
    protected $table = 'mega_dangky_hoc';
}