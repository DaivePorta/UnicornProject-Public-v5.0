<%@ WebHandler Language="VB" Class="NOLTDOCC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOLTDOCC : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Dim CTLG_CODE, SCSL_CODE, TIPO_DCTO, FACC_CODE As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String
        
        Dim compra As New Nomade.NC.NCFactura("BN")
        
        Dim dt As DataTable
    
        Try
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            TIPO_DCTO = context.Request("TIPO_DCTO")
            FACC_CODE = context.Request("FACC_CODE")
            
            Select Case OPCION
                Case "DOCUMENTOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCFactura("BN").lista_dcto_pagar("", "", "", "", "", CTLG_CODE, SCSL_CODE, TIPO_DCTO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("NUM_DCTO").ToString & """,")
                            resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    'Case "VER_FLUJO"
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                    '    dt = New Nomade.NC.NCFactura("BN").busca_CAB_dcto_pagar(FACC_CODE, "0")
                    '    resb.Append("[")
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("{ ""name"": """ & dt.Rows(0)("CODIGO").ToString & """, ""documento"" : """ & dt.Rows(0)("DESC_TIPO_DCTO").ToString & """, ""numero"" : """ & dt.Rows(0)("SERIE_DOC_REGISTRO").ToString & "-" & dt.Rows(0)("NUM_DOC_REGISTRO").ToString & """, ""parent"" : null, ""url"" : ""?f=NOMDOCC&codigo=" & dt.Rows(0)("CODIGO").ToString & """, ""type"" : ""green"" },")
                    '        resb.Append(DevolverOrigenes(dt(0)("DCTO_CODE_REF").ToString, dt.Rows(0)("CODIGO").ToString, dt(0)("TIPO_DCTO").ToString))
                    '    End If
                    '    resb.Append("{}")
                    '    resb = resb.Replace(",{}", String.Empty)
                    '    resb.Append("]")
                    '    res = resb.ToString()
                Case "VER_FLUJO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCFactura("BN").busca_CAB_dcto_pagar(FACC_CODE, "0")
                    
                    resb.Append("")
                    If Not (dt Is Nothing) Then
                        resb.AppendFormat(" {{""name"":""{0}"",""url"":""?f=NOMDOCC&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""type"" : ""green"",", dt.Rows(0)("CODIGO").ToString, dt.Rows(0)("DESC_TIPO_DCTO_TRACKING").ToString, dt.Rows(0)("SERIE_DOC_REGISTRO").ToString + "-" + dt.Rows(0)("NUM_DOC_REGISTRO").ToString)
                        resb.AppendFormat("""children"": [{0}] , ", ObtenerOrigenes(dt.Rows(0)("DCTO_CODE_REF").ToString, dt.Rows(0)("TIPO_DCTO").ToString, dt.Rows(0)("CODIGO").ToString))
                        resb.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(dt.Rows(0)("CODE_DCTO_DESTINO").ToString, dt.Rows(0)("TIPO_DCTO_DESTINO").ToString, dt.Rows(0)("CODIGO").ToString))
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    'Private Function DevolverOrigenes(ByVal DCTOS As String, ByVal PADRE As String, ByVal TIPO_DCTO As String) As String
    '    If DCTOS = "" Or DCTOS = Nothing Then
    '        Return ""
    '    Else
    '        Dim docs = DCTOS.Split(",")
    '        Dim origenes As String = ""
    '        Dim nombre As String = ""
    '        Select Case TIPO_DCTO
    '            Case "0009", "0031"
    '                For Each doc As String In docs
    '                    Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(doc)
    '                    If Not data Is Nothing Then
    '                        origenes &= "{ ""name"" : """ & data.Rows(0)("CODIGO").ToString & """, ""documento"" : """ & data.Rows(0)("DESC_TIPO_DCTO").ToString & """, ""numero"" : """ & data.Rows(0)("REQC_CODE").ToString & "-" & data.Rows(0)("REQC_NUM_SEQ_DOC").ToString & """, ""parent"" : """ & PADRE & """, ""url"" : ""?f=NAMINSA&codigo=" & data.Rows(0)("CODIGO").ToString & """ },"
    '                        origenes &= DevolverOrigenes(data.Rows(0)("ORGN").ToString, data.Rows(0)("CODIGO").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString)
    '                    End If
    '                Next
    '            Case "0026"
    '                For Each doc As String In docs
    '                    Dim data As DataTable = New Nomade.CO.CORegistroCompras("BN").LISTAR_CABECERA_ORDCOMPRA(doc)
    '                    If Not data Is Nothing Then
    '                        Dim tipo_doc As String = IIf(data.Rows(0)("TIPODOC").ToString = "C", "O/C PROVEEDOR", "O/S PROVEEDOR")
    '                        origenes &= "{ ""name"" : """ & data.Rows(0)("CODIGO").ToString & """, ""documento"" : """ & tipo_doc & """, ""numero"" : """ & data.Rows(0)("CORRELATIVO").ToString & """, ""parent"" : """ & PADRE & """, ""url"" : ""?f=NOMORDC&codigo=" & data.Rows(0)("CODIGO").ToString & """ },"
    '                    End If
    '                Next
    '        End Select
    '        Return origenes
    '    End If
    'End Function
 
    Private Function ObtenerOrigenes(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim resb2 As New StringBuilder
            resb2.Clear()
            Select Case TIPO_DCTO
                '            Case "0009", "0031"
                '                For Each doc As String In docs
                '                    Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(doc)
                '                    If Not data Is Nothing Then
                '                        origenes &= "{ ""name"" : """ & data.Rows(0)("CODIGO").ToString & """, ""documento"" : """ & data.Rows(0)("DESC_TIPO_DCTO").ToString & """, ""numero"" : """ & data.Rows(0)("REQC_CODE").ToString & "-" & data.Rows(0)("REQC_NUM_SEQ_DOC").ToString & """, ""parent"" : """ & PADRE & """, ""url"" : ""?f=NAMINSA&codigo=" & data.Rows(0)("CODIGO").ToString & """ },"
                '                        origenes &= DevolverOrigenes(data.Rows(0)("ORGN").ToString, data.Rows(0)("CODIGO").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString)
                '                    End If
                '                Next
                
                Case "0009", "0050", "0031" 'GUIA SALIDA, REMISION REMITENTE---------------------                             
                    Dim naTipoMovimiento As New Nomade.NA.NATipoMovimiento("BN")
                    For Each doc As String In docs
                        Dim data As DataTable = naTipoMovimiento.busca_CAB_dcto_almacen(doc)
                        If Not data Is Nothing Then
                            resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": false,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                            resb2.AppendFormat("""children"": [{0}] }} ", ObtenerOrigenes(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString)) ' compra P00000027 o venta V00000012
                            If docs.Length > 0 Then
                                If c <> docs.Length - 1 Then
                                    resb2.Append(",")
                                End If
                            End If
                        End If
                        c += 1
                    Next
                    
                    'Case "0009", "0050" 'GUIA SALIDA, REMISION REMITENTE---------------------                    
                    '    For Each doc As String In docs
                    '        Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(doc)
                    '        If Not data Is Nothing Then
                    '            resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": false,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                    '            resb2.AppendFormat("""children"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))
                    '            If docs.Length > 0 Then
                    '                If c <> docs.Length - 1 Then
                    '                    resb2.Append(",")
                    '                End If
                    '            End If
                    '        End If
                    '        c += 1
                    '    Next
                    
            End Select
            origenes = resb2.ToString
            Return origenes
        End If
    End Function
    
    Private Function ObtenerDestinos(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim tiposDctos = TIPO_DCTO.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim c2 As Integer = 0
            Dim resb2 As New StringBuilder
            For Each tipo As String In tiposDctos
                Select Case tipo
                    Case "0001", "0003", "0012" 'FACTURA/BOLETA/TICKET COMPRAS Y VENTAS ------------------------------------                            
                        
                        'For Each doc As String In docs
                        Dim data As DataTable = Nothing
                        If docs(c).Length = 9 Then
                            If docs(c).Substring(0, 1) = "P" Then
                                Dim ncFactura As New Nomade.NC.NCFactura("BN")
                                data = ncFactura.busca_CAB_dcto_pagar(docs(c), "0")
                                If Not data Is Nothing Then
                                    resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NOMDOCC&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("SERIE_DOC_REGISTRO").ToString + "-" + data.Rows(0)("NUM_DOC_REGISTRO").ToString)
                                    resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("CODE_DCTO_DESTINO").ToString, data.Rows(0)("TIPO_DCTO_DESTINO").ToString, data.Rows(0)("CODIGO").ToString))
                                 
                                End If
                                    
                            ElseIf docs(c).Substring(0, 1) = "V" Then
                                Dim nvVenta As New Nomade.NV.NVVenta("BN")
                                data = nvVenta.ListarDocumentosVenta(docs(c), "", "", "", "", "", "", "", "")
                                If Not data Is Nothing Then
                                    resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NVMDOCV&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DOCUMENTO").ToString, data.Rows(0)("DCTO_SERIE").ToString + "-" + data.Rows(0)("DCTO_NRO").ToString)
                                    resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("CODE_DCTO_DESTINO").ToString, data.Rows(0)("TIPO_DCTO_DESTINO").ToString, data.Rows(0)("CODIGO").ToString))
                                    
                                End If
                            ElseIf docs(c).Substring(0, 1) = "A" Then
                                data = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                                If Not data Is Nothing Then
                                    resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                                    resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("CODE_DCTO_DESTINO").ToString, data.Rows(0)("TIPO_DCTO_DESTINO").ToString, data.Rows(0)("CODIGO").ToString))
                               
                                End If
                            End If
                        End If
                        'Next
                                        
                    Case "0009", "0050", "0031" 'GUIA SALIDA, REMISION REMITENTE---------------------                    
                        Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                        If Not data Is Nothing Then
                            If Not data Is Nothing Then
                                resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                                resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("CODE_DCTO_DESTINO").ToString, data.Rows(0)("TIPO_DCTO_DESTINO").ToString, data.Rows(0)("CODIGO").ToString))
                                                              
                            End If
                        End If
                End Select
                If tiposDctos.Length > 0 Then
                    If c <> tiposDctos.Length - 1 Then
                        resb2.Append(",")
                    End If
                End If
                c += 1
            Next
          
            origenes = resb2.ToString
            Return origenes
        End If
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class