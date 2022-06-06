<%@ WebHandler Language="VB" Class="NCMRTEP" %>


Imports System
Imports System.Web
Imports System.Data

Public Class NCMRTEP : Implements IHttpHandler
    
    Dim dt As DataTable
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim b As New Nomade.NC.NCBanco("bn")
    Dim s As New Nomade.NB.NBChequera("bn")
    Dim flag As String
    Dim empresa As String
    Dim fecha_registro As String
    Dim fecha_inicio As String
    Dim fecha_pago As String
    Dim pidm_responsable As String
    Dim descripcion As String
    Dim tipo As String
    Dim estado As String
    Dim fecha_fin As String
    Dim nro As String
    Dim usuario As String
    Dim codigo As String
    Dim empresapidm As String
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim monto As String
    Dim moneda As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
    
        context.Response.ContentType = "text/plain"
       
        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")
        
        codigo = context.Request("codigo")
        
        empresa = context.Request("empresa")
        
        fecha_fin = context.Request("fecha_fin")
        If fecha_fin <> String.Empty Then
            fecha_fin = Utilities.fechaLocal(context.Request("fecha_fin"))
        End If
        
        fecha_inicio = context.Request("fecha_inicio")
        If fecha_inicio <> String.Empty Then
            fecha_inicio = Utilities.fechaLocal(context.Request("fecha_inicio"))
        End If
        
  
        
        pidm_responsable = context.Request("pidm_responsable")
        descripcion = context.Request("descripcion")
        tipo = context.Request("tipo")
        estado = context.Request("estado")
       
        nro = context.Request("nro")
        usuario = context.Request("usuario")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        pidm_cuenta = context.Request("pidm_cuenta")
        monto = context.Request("monto")
        moneda = context.Request("moneda")
        
        Try
        
            Select Case flag.ToString()

                Case "1"
                    Dim p As New Nomade.NC.NCTarjetasEmpresa("Bn")
                    res = p.CrearTarjetaEmpresa(pidm_cuenta, cuenta_bancaria, nro, descripcion, pidm_responsable, tipo, estado, fecha_inicio, fecha_fin, usuario)
                
                Case "2"
                    Dim p As New Nomade.NC.NCTarjetasEmpresa("Bn")
                    res = p.ActualizarTarjetaEmpresa(codigo, pidm_cuenta, cuenta_bancaria, nro, descripcion, pidm_responsable, tipo, estado, fecha_inicio, fecha_fin, usuario)

                Case "3"
                    Dim p As New NOMADE.NC.NCTarjetasEmpresa("Bn")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTarjetaEmpresa(codigo, pidm_cuenta, cuenta_bancaria, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"":""" & dt.Rows(0)("CODE").ToString & """,")
                    resb.Append("""EMPRESA"":{""NOMBRE"":""" & dt.Rows(0)("EMPRESA").ToString & """, ""CODIGO"":""" & dt.Rows(0)("EMPRESA_CODE").ToString & """},")
                    resb.Append("""PIDM"":""" & dt.Rows(0)("PIDM").ToString & """,")
                    resb.Append("""CUENTA"":{""NOMBRE"":""" & dt.Rows(0)("CUENTA").ToString & """, ""CODIGO"":""" & dt.Rows(0)("CUENTA_CODE").ToString & """},")
                    resb.Append("""DESCRIPCION"":""" & dt.Rows(0)("DESCRIPCION").ToString & """,")
                    resb.Append("""NRESPONSABLE"":""" & dt.Rows(0)("NRESPONSABLE").ToString & """,")
                    resb.Append("""NUMERO"":""" & dt.Rows(0)("NUMERO").ToString & """,")
                    resb.Append("""TIPO"":""" & dt.Rows(0)("TIPO").ToString & """,")
                    resb.Append("""FECHA_INICIO"":""" & dt.Rows(0)("FECHA_INICIO").ToString & """,")
                    resb.Append("""FECHA_FIN"":""" & dt.Rows(0)("FECHA_FIN").ToString & """,")
                    resb.Append("""ESTADO"":""" & dt.Rows(0)("ESTADO").ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "4"
                    Dim p As New NOMADE.NC.NCTipoPago("Bn")
                    dt = p.Listar_TiPago("", "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion_corta", "FOPA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "descripcion_corta", "ASC"), "codigo", "descripcion_corta", "FOPA")
                    End If
                
                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If
                    
                Case "6"
                  
                    dt = s.ListarCtasBancarias(empresapidm, "A", "")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If
                
           
                Case "LE" 'EMPLEADOS
                    Dim q As New Nomade.NC.NCEEmpleado("Bn")
                    dt = q.Listar_Empleados(0, 0, "A", empresa)
               
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            
                Case "L"
                    Dim P As New NOMADE.NC.NCTarjetasEmpresa("Bn")
                    Dim sb As New StringBuilder()

                    dt = P.ListarTarjetaEmpresa(String.Empty, pidm_cuenta, cuenta_bancaria, String.Empty)

                    If Not dt Is Nothing Then
                        sb.Append("[")

                        For Each row As DataRow In dt.Rows
                            sb.Append("{")
                            sb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("EMPRESA").ToString & """, ""CODIGO"":""" & row("EMPRESA_CODE").ToString & """},")
                            sb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                            sb.Append("""CUENTA"":{""NOMBRE"":""" & row("CUENTA").ToString & """, ""CODIGO"":""" & row("CUENTA_CODE").ToString & """},")
                            sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            sb.Append("""NRESPONSABLE"":""" & row("NRESPONSABLE").ToString & """,")
                            sb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                            sb.Append("""NTIPO"":""" & row("NTIPO").ToString & """,")
                            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            sb.Append("},")

                        Next
                        sb.Append("-")
                        sb.Replace("},-", "}")

                        sb.Append("]")
                    End If

                    res = sb.ToString()
                    
            End Select

            context.Response.Write(res)
       
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
    End Sub
 
        
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
         
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option moneda=""" & dt.Rows(i)("MONEDADES").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    End If
                End If
            Next
          
        Else
            res = "error"
        End If
        Return res
    End Function
    
     
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class