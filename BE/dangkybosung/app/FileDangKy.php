<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class FileDangKy extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'file' , 'idsinhvien'
    ];
    protected $table = 'mega_file';
}