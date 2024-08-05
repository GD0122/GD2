

export const pendaftaran_pasien = [{
    name:'name',
    type:'string',
    val:''
},{
    name:'tanggalLahir',
    type:'date',
    val:'',
    pattern:"\\d{4}-\\d{2}-\\d{2}"

},

{
    name:'noTelp',
    type:'string',
    val:''
},
{
    name:'alamat',
    type:'string',
    val:''
},


]

export const tambah_rekam = [
{
    name:'diagnosa',
    type:'string',
    val:''
},

{
    name:'terapi',
    type:'string',
    val:''
},
{
    name:'dokter',
    type:'string',
    val:''
},
{
    name:'perawat',
    type:'string',
    val:''
},
{
    name:'pro',
    type:'string',
    val:''
},
{
    name:'tgl_tdkn',
    type:'date',
    val:'',
    pattern:"\\d{4}-\\d{2}-\\d{2}"
},
]


export const tambah_jadwal = [{
    name:'waktu',
    type:'time',
    val:''
},{
    name:'tanggal',
    type:'date',
    val:''
}
]