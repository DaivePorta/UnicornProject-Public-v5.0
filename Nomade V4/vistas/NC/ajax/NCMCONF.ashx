<%@ WebHandler Language="VB" Class="NCMCONF" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCONF : Implements IHttpHandler
    
    Dim dts As DataTable
    Dim dt As DataTable
    Dim dt1 As DataTable
    Dim dt2 As DataTable
    Dim dt3 As DataTable
    
    Dim oPais As New Nomade.NC.NCPais("Bn")
    Dim oMoneda As New Nomade.NC.NCMonedas("Bn")
    Dim oIdioma As New Nomade.NC.NCIdioma("Bn")
    Dim oResConfi As New Nomade.NC.NCZonaHoraria("Bn")
    Dim oConfiguraR As New Nomade.NC.NCConfiguracionR("Bn")
    
    Dim resConfim As New StringBuilder
    Dim resPais As New StringBuilder
    Dim resMone As New StringBuilder
    Dim resIdiom As New StringBuilder
    Dim resConfi As New StringBuilder
    
    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim code As String
    
    Dim codigo As String
    Dim configuracion, idioma, estado, pais, moneda, zonaHoraria, UbiSimbolo, sep_decimal, usuario As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        codigo = context.Request("codigo")
               
        configuracion = context.Request("configuracion")
        idioma = context.Request("idioma")
        pais = context.Request("pais")
        moneda = context.Request("moneda")
        UbiSimbolo = context.Request("UbiSimbolo")
        zonaHoraria = context.Request("zonaHoraria")
        sep_decimal = context.Request("sep_decimal")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        
        
            
        If (opcion = "configm") Then
                
            context.Response.ContentType = "application/json; charset=utf-8"
            dts = oResConfi.Listar_ZonaHoraria(String.Empty, String.Empty, "A")
            If Not (dts Is Nothing) Then
                resConfi.Append("[")
                For Each MiDataRow As DataRow In dts.Rows
                    resConfi.Append("{")
                    resConfi.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                    resConfi.Append("""DESCRIPCION"" :" & """" & MiDataRow("Zona_horaria").ToString & """")
                    resConfi.Append("}")
                    resConfi.Append(",")
                Next
                resConfi.Append("{}")
                resConfi = resConfi.Replace(",{}", String.Empty)
                resConfi.Append("]")
            End If
            res = resConfi.ToString()
        End If
            
        If (opcion = "pais") Then
                
            context.Response.ContentType = "application/json; charset=utf-8"
            dt1 = oPais.Listar_Pais(String.Empty, String.Empty, "A")
            If Not (dt1 Is Nothing) Then
                resPais.Append("[")
                For Each MiDataRow As DataRow In dt1.Rows
                    resPais.Append("{")
                    resPais.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                    resPais.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                    resPais.Append("}")
                    resPais.Append(",")
                Next
                resPais.Append("{}")
                resPais = resPais.Replace(",{}", String.Empty)
                resPais.Append("]")
            End If
            res = resPais.ToString()
                            
        End If
        If (opcion = "moneda") Then
                
            context.Response.ContentType = "application/json; charset=utf-8"
            dt2 = oMoneda.ListarMoneda(String.Empty, String.Empty, "A")
            If Not (dt2 Is Nothing) Then
                resMone.Append("[")
                For Each MiDataRow As DataRow In dt2.Rows
                    resMone.Append("{")
                    resMone.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                    resMone.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                    resMone.Append("}")
                    resMone.Append(",")
                Next
                resMone.Append("{}")
                resMone = resMone.Replace(",{}", String.Empty)
                resMone.Append("]")
            End If
            res = resMone.ToString()
                
        End If
            
        If (opcion = "idioma") Then
                
            context.Response.ContentType = "application/json; charset=utf-8"
            dt3 = oIdioma.ListarIdioma(String.Empty, String.Empty, "A")
            If Not (dt3 Is Nothing) Then
                resIdiom.Append("[")
                For Each MiDataRow As DataRow In dt3.Rows
                    resIdiom.Append("{")
                    resIdiom.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                    resIdiom.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                    resIdiom.Append("}")
                    resIdiom.Append(",")
                Next
                resIdiom.Append("{}")
                resIdiom = resIdiom.Replace(",{}", String.Empty)
                resIdiom.Append("]")
            End If
            res = resIdiom.ToString()
           
        End If
            
        Select Case opcion
                   
            Case "0"
                    
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = oConfiguraR.Listar_ConfiguracionRegional(code, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("descripcion").ToString & """,")
                        resb.Append("""PAIS"" :" & """" & MiDataRow("desc_pais").ToString & """,")
                        resb.Append("""COD_PAIS"" :" & """" & MiDataRow("cod_pais").ToString & """,")
                        resb.Append("""IDIOMA"" :" & """" & MiDataRow("desc_idioma").ToString & """,")
                        resb.Append("""COD_IDIOMA"" :" & """" & MiDataRow("cod_idioma").ToString & """,")
                        resb.Append("""MONEDA"" :" & """" & MiDataRow("desc_moneda").ToString & """,")
                        resb.Append("""COD_MONEDA"" :" & """" & MiDataRow("cod_moneda").ToString & """,")
                        resb.Append("""ZONA_HORARIA"" :" & """" & MiDataRow("desc_zona_h").ToString & """,")
                        resb.Append("""COD_ZONA"" :" & """" & MiDataRow("cod_zona_h").ToString & """,")
                        resb.Append("""SEPARACION"" :" & """" & MiDataRow("separacion").ToString & """,")
                        resb.Append("""COD_SEPA"" :" & """" & MiDataRow("cod_sepa").ToString & """,")
                        resb.Append("""UBICACION"" :" & """" & MiDataRow("ubicacion").ToString & """,")
                        resb.Append("""COD_UBICACION"" :" & """" & MiDataRow("cod_ubicacion").ToString & """,")
                        resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """")
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "N"
                
                res = Crear_Configuracion(configuracion, idioma, pais, moneda, zonaHoraria, UbiSimbolo, sep_decimal, estado, usuario)
                    
            Case "M"
                           
                res = Actualizar_Configuracion(codigo, configuracion, idioma, pais, moneda, zonaHoraria, UbiSimbolo, sep_decimal, estado, usuario)
                    
            Case "A"
                res = CambiarEstadoConfiguracionRegional(code)
                        
        End Select
        context.Response.Write(res)
            
        
    End Sub
    
    Public Function Crear_Configuracion(ByVal p_ZONA_HORA As String, ByVal p_IDIOMA As String, ByVal p_PAIS As String, ByVal p_MONE As String, ByVal p_MERIDIANO As String, _
                                                ByVal p_UBICACION As String, ByVal p_SEPARACION As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        
        Dim datos(1) As String
        
        datos = oConfiguraR.Crear_ConfiguracionRegional(p_ZONA_HORA, p_IDIOMA, p_PAIS, p_MONE, p_MERIDIANO, p_UBICACION, p_SEPARACION, p_ESTADO_ID, p_USUA_ID)
                                                
        Return datos(0)
    End Function
    
    
    
    Public Function Actualizar_Configuracion(ByVal p_CODE As String, ByVal p_ZONA_H As String, ByVal p_IDIOMA As String, ByVal p_PAIS As String, ByVal p_MONE As String, ByVal p_MERIDIANO As String, _
                                                ByVal p_UBICACION As String, ByVal p_SEPARACION As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        Dim datos(1) As String
        
        datos = oConfiguraR.Actualizar_ConfiguracionRegional(p_CODE, p_ZONA_H, p_IDIOMA, p_PAIS, p_MONE, p_MERIDIANO, p_UBICACION, p_SEPARACION, p_ESTADO_ID, p_USUA_ID)
                                                             
        Return datos(0)
    End Function
    
     
    Public Function CambiarEstadoConfiguracionRegional(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = oConfiguraR.CambiarEstado_ConfiguracionRegional(p_CODE)
        
        Return datos(0)
     
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class