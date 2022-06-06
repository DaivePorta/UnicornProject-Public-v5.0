<%@ WebHandler Language="VB" Class="NFMUNID" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NFMUNID : Implements IHttpHandler
    Dim flag As String
    Dim res As String
    Dim dt As DataTable
    Dim codigo As String
    Dim user As String
    Dim path As String
    Dim img As HttpPostedFile
    Dim rdel As String
     Dim resb As New StringBuilder
    Dim activo As String
    Dim fecha_ini, fecha_ter, mtc, nro_tarjeta, placa, anio_fab, marca, modelo, color, nro_asie, peso_seco, peso_bruto, nro_motor, nro_serie, nro_chasis, gps, fecha_gps, propietario, compa_soat,
        poliza_soat, fecha_soat, plataforma, fila, tipo_unidad, chofer, empresa, p_CARGA_MAXIMA, p_NRO_CONSTANCIA, p_FECHA_REV_TEC, p_NRO_REV_TEC, p_COMBUSTIBLE As String
    Dim fechacho As String
    Dim turno, filename As String
    Dim usua As String
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        user = context.Request("user")
        activo = context.Request("acti")
        rdel = context.Request("rutaelim")
        img = context.Request.Files("img")
        usua = context.Request("usua")
        
        fecha_ini = Utilities.fechaLocal(context.Request("fein"))
        fecha_ter = context.Request("fete")
        If fecha_ter <> String.Empty Then
            fecha_ter = Utilities.fechaLocal(context.Request("fete"))
        End If
        mtc = context.Request("cmtc")
        nro_tarjeta = context.Request("nuta")
        placa = context.Request("plac")
        anio_fab = context.Request("anfa")
        marca = context.Request("marc")
        modelo = context.Request("mode")
        color = context.Request("colo")
        turno = context.Request("turn")
        fechacho = Utilities.fechaLocal(context.Request("fech"))
        'peso_bruto = context.Request("pebu")
        nro_motor = context.Request("numo")
        nro_serie = context.Request("nuse")
        nro_chasis = context.Request("nuch")
        gps = context.Request("sgps")
        fecha_gps = context.Request("fegp")
        If fecha_gps <> String.Empty Then
            fecha_gps = Utilities.fechaLocal(context.Request("fegp"))
        End If
        propietario = context.Request("prop")
        compa_soat = context.Request("coso")
        poliza_soat = context.Request("poso")
        fecha_soat = Utilities.fechaLocal(context.Request("feso"))
       
       
        tipo_unidad = context.Request("tiun")
        chofer = context.Request("chof")
        empresa = context.Request("empr")
        filename = context.Request("noar")
        
        plataforma = "0"
        fila = "0"
        p_CARGA_MAXIMA = context.Request("p_CARGA_MAXIMA")
        p_NRO_CONSTANCIA = context.Request("p_NRO_CONSTANCIA")
        p_FECHA_REV_TEC = context.Request("p_FECHA_REV_TEC")
        If p_FECHA_REV_TEC <> String.Empty Then
            p_FECHA_REV_TEC = Utilities.fechaLocal(context.Request("p_FECHA_REV_TEC"))
        End If
        p_NRO_REV_TEC = context.Request("p_NRO_REV_TEC")
        p_COMBUSTIBLE = context.Request("p_COMBUSTIBLE")

        Try
            
            Select Case flag.ToString
                Case "1"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    Dim array As Array
                    array = p.CrearUnidad(fecha_ini, fecha_ter, mtc, nro_tarjeta, placa, anio_fab, marca, modelo, color, nro_motor,
                                          nro_serie, nro_chasis, gps, fecha_gps, propietario, compa_soat, poliza_soat, fecha_soat, activo,
                                          user, plataforma, fila, tipo_unidad, empresa, p_CARGA_MAXIMA, p_NRO_CONSTANCIA, p_FECHA_REV_TEC, p_NRO_REV_TEC, p_COMBUSTIBLE)
                   
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "2"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    Dim array As Array
                    array = p.ActualizarUnidad(codigo, fecha_ini, fecha_ter, mtc, nro_tarjeta, placa, anio_fab, marca, modelo, color, nro_motor,
                                               nro_serie, nro_chasis, gps, fecha_gps, propietario, compa_soat, poliza_soat, fecha_soat, activo,
                                               user, plataforma, fila, tipo_unidad, empresa, p_CARGA_MAXIMA, p_NRO_CONSTANCIA, p_FECHA_REV_TEC, p_NRO_REV_TEC, p_COMBUSTIBLE)
                    
                    If Not (array Is Nothing) Then
                        resb.Append("[{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""RESPUESTA"" :" & """" & array(1).ToString & """")
                        resb.Append("}]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "3"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    res = p.CambiarEstadoUnidad(codigo)
                    
                Case "4" 'lista de ctlg empresas
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")

                    
                Case "5" ' lista de propietarios para el catalogo actl
                    Dim p As New Nomade.NC.NCEPropietario("BN")
                    dt = p.ListarPropietario(0, "A", empresa)
                    res = GenerarTablaP(dt) 'tabla propietario
                
                Case "5b" ' lista de propietarios para el catalogo actl
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarPropietario("A")
                    res = GenerarTablaP(dt) 'tabla propietario
                    
                Case "6" ' carga lista de choferes disponibles para el catalogo actual
                    Dim p As New Nomade.NC.NCEChofer("BN")
                    dt = p.ListarChofer(0, empresa, "A")
                    res = GenerarSelect(dt, "pidm", "nombre", "A") 'tabla chofer
                   
                Case "7" ' carga lista de marcas
                    
                    Dim p As New Nomade.NF.NFMarcaUnidad("Bn")
                    dt = p.ListarMarcaUnidad(String.Empty, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "MARCA")
                    
                Case "8" 'carga lista de modelos
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    dt = p.ListarModelo(String.Empty, marca, String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "descripcion", "MODELO")
                    
                Case "9" ' grabacion de una imagen
                    path = GrabaImagen(img, context, filename)
                    Dim p As New Nomade.NF.NFImagenes("BN")
                    p.CrearImagen(codigo, "U", path, user)
                    res = path
                                        
                Case "10" 'eliminacion de imagenes
                    Dim p As New Nomade.NF.NFImagenes("BN")
                    p.EliminarImagen(codigo) 'eliminacion logica bd
                    res = EliminaImagen(rdel, context) 'eliminacion fisica del servr
                
                Case "11" 'carga de imagenes
                    Dim p As New Nomade.NF.NFImagenes("BN")
                    dt = p.ListarImagen(codigo, "U")
                    context.Response.ContentType = "application/json; charset=utf-8"
                   
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For i As Integer = 0 To dt.Rows.Count - 1
                            resb.Append("{")
                            resb.Append("""RUTA"" :" & """" & dt.Rows(i)("RUTA") & """,")
                            resb.Append("""CODIGO"" :" & """" & dt.Rows(i)("CODIGO") & """")
                            resb.Append("}")
                            If i <> dt.Rows.Count - 1 Then
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("]")
                        res = resb.ToString()
                    Else : res = "error"
                    End If
                    
                Case "12.5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarUnidad(codigo, IIf(empresa Is Nothing, String.Empty, empresa), String.Empty, 0, String.Empty)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
                Case "12" ' carga del formulario
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarUnidad(codigo, IIf(empresa Is Nothing, String.Empty, empresa), String.Empty, 0, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                         
                        resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                        resb.Append("""FECHA_INI"" :" & """" & dt.Rows(0)("FECHA_INI") & """,")
                        resb.Append("""FECHA_TER"" :" & """" & dt.Rows(0)("FECHA_TER") & """,")
                        resb.Append("""MTC"" :" & """" & dt.Rows(0)("MTC") & """,")
                        resb.Append("""NRO_TARJETA"" :" & """" & dt.Rows(0)("NRO_TARJETA") & """,")
                        resb.Append("""PLACA"" :" & """" & dt.Rows(0)("PLACA") & """,")
                        resb.Append("""ANIO_FAB"" :" & """" & dt.Rows(0)("ANIO_FAB") & """,")
                        resb.Append("""MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                        resb.Append("""MODELO"" :" & """" & dt.Rows(0)("MODELO") & """,")
                        resb.Append("""COLOR"" :" & """" & dt.Rows(0)("COLOR") & """,")
                        resb.Append("""MOTOR"" :" & """" & dt.Rows(0)("MOTOR") & """,")
                        resb.Append("""SERIE"" :" & """" & dt.Rows(0)("SERIE") & """,")
                        resb.Append("""CHASIS"" :" & """" & dt.Rows(0)("CHASIS") & """,")
                        resb.Append("""GPS"" :" & """" & dt.Rows(0)("GPS") & """,")
                        resb.Append("""FECHA_GPS"" :" & """" & dt.Rows(0)("FECHA_GPS") & """,")
                        resb.Append("""PROPIETARIO"" :" & """" & dt.Rows(0)("PROPIETARIO") & """,")
                        resb.Append("""PROPIETARIO_NOMBRE"" :" & """" & dt.Rows(0)("PROPIETARIO_NOMBRE") & """,")
                        resb.Append("""COMPA_SOAT"" :" & """" & dt.Rows(0)("COMPA_SOAT") & """,")
                        resb.Append("""POLIZA_SOAT"" :" & """" & dt.Rows(0)("POLIZA_SOAT") & """,")
                        resb.Append("""FECHA_SOAT"" :" & """" & dt.Rows(0)("FECHA_SOAT") & """,")
                        resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                        resb.Append("""USUARIO"" :" & """" & dt.Rows(0)("USUARIO") & """,")
                        resb.Append("""PLATAFORMA"" :" & """" & dt.Rows(0)("PLATAFORMA").ToString().Replace(",", ".") & """,")
                        resb.Append("""FILA"" :" & """" & dt.Rows(0)("FILA") & """,")
                        resb.Append("""TIPO_UNIDAD"" :" & """" & dt.Rows(0)("TIPO_UNIDAD") & """,")
                        resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                        resb.Append("""NRO_CONSTANCIA"" :" & """" & dt.Rows(0)("NRO_CONSTANCIA") & """,")
                        resb.Append("""FECHA_REV_TEC"" :" & """" & dt.Rows(0)("FECHA_REV_TEC") & """,")
                        resb.Append("""NRO_REV_TEC"" :" & """" & dt.Rows(0)("NRO_REV_TEC") & """,")
                        resb.Append("""NOMBRE_MARCA"" :" & """" & dt.Rows(0)("nombre_marca") & """,")
                        resb.Append("""NOMBRE_MODELO"" :" & """" & dt.Rows(0)("NOMBRE_MODELO") & """,")
                        resb.Append("""NRO_EJES"" :" & """" & dt.Rows(0)("NRO_EJES") & """,")
                        resb.Append("""COMBUSTIBLE_CODE"" :" & """" & dt.Rows(0)("COMBUSTIBLE_CODE") & """,")
                        resb.Append("""COMBUSTIBLE"" :" & """" & dt.Rows(0)("COMBUSTIBLE") & """,")
                        resb.Append("""CARGA_MAXIMA"" :" & """" & dt.Rows(0)("CARGA_MAXIMA") & """")
                       
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    
                    End If
                    
                    
                Case "13" 'cargas de texto dependientes de modelo
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFModeloUnidad("BN")
                    dt = p.ListarModelo(modelo, String.Empty, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""PESO_SECO"" :" & """" & dt.Rows(0)("PESO_SECO").ToString().Replace(",", ".") & """,")
                    resb.Append("""PESO_BRUTO"" :" & """" & dt.Rows(0)("PESO_BRUTO").ToString().Replace(",", ".") & """,")
                    resb.Append("""LARGO"" :" & """" & dt.Rows(0)("LARGO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ANCHO"" :" & """" & dt.Rows(0)("ANCHO").ToString().Replace(",", ".") & """,")
                    resb.Append("""ALTO"" :" & """" & dt.Rows(0)("ALTO").ToString().Replace(",", ".") & """,")
                    resb.Append("""NRO_EJES"" :" & """" & dt.Rows(0)("NRO_EJES").ToString().Replace(",", ".") & """,")
                    resb.Append("""ASIENTOS"" :" & """" & dt.Rows(0)("ASIENTOS") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "14" ' carga de lista de choferes de la unidad
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarChoferUnidad(String.Empty, 0, codigo, String.Empty)
                    res = GenerarTablaCH(dt) 'tabla chofer
                    
                Case "15"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    res = p.CrearChoferUnidad(chofer, codigo, fechacho, turno, activo, user)
                    
                Case "16"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    res = p.ActualizarChoferUnidad(codigo, fechacho, turno, activo, user)
                    
                Case "17"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarChoferUnidad(codigo, 0, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""PIDM"" :" & """" & dt.Rows(0)("PIDM") & """,")
                    resb.Append("""TURNO"" :" & """" & dt.Rows(0)("TURNO") & """,")
                    resb.Append("""ACTIVO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "18"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NF.NFUnidadVehiculo("BN")
                    dt = p.ListarChoferUnidad(String.Empty, 0, codigo, String.Empty)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
 
    Public Function GenerarTablaCH(ByVal dt As DataTable) As String
        
        
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>CODIGO</th>"
        res += "<th>NOMBRE</th>"
        res += "<th>TELEFONO</th>"
        res += "<th>ESTADO</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
     
        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("CODIGO").ToString() & """>"
                res += "<td align=""center"" id=""cod" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("pidm").ToString() & "</td>"
                res += "<td id=""nom" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("nombre").ToString() & "</td>"
                res += "<td id=""tel" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("telefono").ToString() & "</td>"
                res += "<td id=""tel" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        End If

        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
    
    
    Public Function GenerarTablaP(ByVal dt As DataTable) As String
        
        
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>CODIGO</th>"
        res += "<th>NOMBRE</th>"
        res += "<th>TELEFONO</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
     
        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("PIDM").ToString() & """>"
                res += "<td align=""center"" id=""cod" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("pidm").ToString() & "</td>"
                res += "<td id=""nom" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("nombre").ToString() & "</td>"
                res += "<td id=""tel" & dt.Rows(i)("PIDM").ToString() & """>" & dt.Rows(i)("telefono").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        End If

        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
    
    
    
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
           
            
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
           
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"

            Next
        
        Else
            res = ""
        End If
        Return res
    End Function
    
    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombredearchivo As String) As String
        Dim rp As String = String.Empty
        Try
                   
            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = "../../../recursos/img/imagenes/unidades"
            savepath = context.Server.MapPath(tempPath)
            Dim filename As String = nombredearchivo
            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If
        
            img.SaveAs(savepath & "\" & filename)
            'context.Response.Write(tempPath & "/" & filename)
            rp = tempPath & "/" & filename
            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
       
        Return rp
    End Function
    
    Public Function EliminaImagen(ByVal ruta As String, ByVal context As HttpContext) As String
        Dim rp As String = String.Empty
        Try
            Dim path As String = context.Server.MapPath(ruta)
            File.Delete(path)
            rp = "archivo eliminado"
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
        Return rp
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class