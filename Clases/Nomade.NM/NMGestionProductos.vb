Public Class NMGestionProductos
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarDetalleAsientos(p_CTLG_CODE As String, p_ALMC_CODE As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpListar_DetalleNaminsa", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCatalogoServicios(ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String,
                                            ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, ByVal p_MARCA_CODE As String,
                                            ByVal p_ESTADO_IND As String, ByVal p_STOCK_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_CATALOGO_SERVICIOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_IND", p_STOCK_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCatalogoProducto(ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String,
                                             ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, ByVal p_MARCA_CODE As String,
                                             ByVal p_ESTADO_IND As String, ByVal p_STOCK_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_CATALOGO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_IND", p_STOCK_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCatalogoProductoImg(ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String,
                                             ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, ByVal p_MARCA_CODE As String,
                                             ByVal p_ESTADO_IND As String, ByVal p_STOCK_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_CATALOGO_PRODUCTO_IMG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_CODE", p_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_IND", p_STOCK_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_PRODUCTO_OPTIMIZADO(ByVal p_ID As String, ByVal p_DESC As String, ByVal p_GRUPO As String,
                               ByVal p_CODE_ANTIGUO As String, ByVal p_ALMC_CODE As String,
                               ByVal p_CTLG_CODE As String, ByVal P_INICIO As Integer, ByVal P_FIN As Integer, ByVal p_ESTADO As String, Optional p_ALMACENABLE_IND As String = "",
                               Optional p_TEXI_IND As String = "", Optional p_COLUMNA_ORDEN As String = "0", Optional p_TIPO_ORDEN As String = "asc"
                               ) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_LIMITE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_ADM", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253)) 'S / N
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXI_IND", p_TEXI_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INICIO", P_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIN", P_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COLUMNA_ORDEN", p_COLUMNA_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ORDEN", p_TIPO_ORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnLISTAR_PROD_SERV(p_CTLG_CODE As String, p_ESTADO As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PROD_SERV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_PRODUCTO_REQUE_COMPRA(ByVal p_ID As String, ByVal p_DESC As String, ByVal p_GRUPO As String, _
                                ByVal p_CODE_ANTIGUO As String, ByVal p_ALMC_CODE As String, _
                                ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_REQUER_COMPRAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_ADM", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function







    'Public Function ASIGNAR_PORCENTAJE_CATEGORIA_PRODUCTO(ByVal p_PROD_CODE As String) As String
    '    Try
    '        Dim msg(3) As String
    '        Dim cmd As IDbCommand
    '        cmd = cn.GetNewCommand("PFS_CREAR_PRODUCTO", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_AUXILIAR", p_CODE_AUXILIAR, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_WEB_IND", p_ESTADO_WEB_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_SERIE_IND", p_SIN_SERIE_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADA_IND", p_SERIADA_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_SERVICIO_IND", p_SERVICIO_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_ENSAMBLADO_IND", p_ENSAMBLADO_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_TOTAL", p_VALOR_TOTAL, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_COMERCIAL", p_NOMBRE_COMERCIAL, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_MONEDA_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_MINIMO", p_VALOR_MINIMO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_DCTO", p_VALOR_DCTO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_PROM_IND", p_PROM_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_MOSTRAR_IND", p_MOSTRAR_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNABLE_IND", p_RETORNABLE_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CAPACIDAD", p_CAPACIDAD, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_DESC_IND", p_SIN_DESC_IND, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_IMAG_RUTA", p_IMAG_RUTA, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_TEXIS", p_CODE_TEXIS, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VOLUMEN", p_VOLUMEN, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_VOLUMEN", p_UNME_VOLUMEN, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_LISTA_IND", p_LISTA_IND, ParameterDirection.Input, 253))

    '        cmd.Parameters.Add(cn.GetNewParameter("p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("p_CODE_IMAGEN", String.Empty, ParameterDirection.Output, 253))

    '        cn.Ejecuta_parms(cmd)
    '        msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
    '        msg(1) = cmd.Parameters("@p_CODE_IMAGEN").Value
    '        msg(2) = "OK"

    '        Return msg
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    Public Function ACTUALIZAR_PRODUCTO(ByVal p_PROD_CODE As String, ByVal p_IMAG_CODE As String, ByVal p_DESC As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CODE_AUXILIAR As String, ByVal p_ESTADO_IND As String,
                                       ByVal p_ESTADO_WEB_IND As String, ByVal p_UNME_CODE As String, ByVal p_GRUP_CODE As String, ByVal p_MARC_CODE As String,
                                       ByVal p_MODELO As String, ByVal p_USUA_ID As String, ByVal p_SIN_SERIE_IND As String, ByVal p_SERIADA_IND As String,
                                       ByVal p_SERVICIO_IND As String, ByVal p_ENSAMBLADO_IND As String, ByVal p_VALOR_TOTAL As String, ByVal p_NOMBRE_COMERCIAL As String,
                                       ByVal p_MONEDA_CODE As String, ByVal p_VALOR_MINIMO As Decimal, ByVal p_VALOR_DCTO As String, ByVal p_PROM_IND As String,
                                       ByVal p_MOSTRAR_IND As String, ByVal p_CTLG_CODE As String, ByVal p_RETORNABLE_IND As String, ByVal p_CAPACIDAD As String,
                                       ByVal p_IMAG_RUTA As String, ByVal p_CODE_TEXIS As String, ByVal p_VOLUMEN As String, ByVal p_UNME_VOLUMEN As String,
                                       ByVal p_LISTA_IND As String, ByVal p_URLPROD As String, Optional ByVal p_SIN_DESC_IND As String = "N", Optional ByVal p_DETRAC_CODE As String = "", Optional ByVal p_DETRAC_PORCENTAJE As String = "0",
                                       Optional ByVal p_PRECIO_IND As String = "E", Optional p_TIPO_BIEN As String = "EXO",
                                       Optional p_ISC As String = "0", Optional p_ENBRUTO_IND As String = "S",
                                       Optional p_ESP_ADICIONAL As String = "", Optional p_PRES_CODE As String = Nothing,
                                       Optional p_PESO As String = "0", Optional p_COMPRABLE_IND As String = "S", Optional p_ISC_CODE As String = "") As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_IMAGEN", p_IMAG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_AUXILIAR", p_CODE_AUXILIAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_WEB_IND", p_ESTADO_WEB_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_SERIE_IND", p_SIN_SERIE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADA_IND", p_SERIADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERVICIO_IND", p_SERVICIO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENSAMBLADO_IND", p_ENSAMBLADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_TOTAL", p_VALOR_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_COMERCIAL", p_NOMBRE_COMERCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_MONEDA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_MINIMO", p_VALOR_MINIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_DCTO", p_VALOR_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROM_IND", p_PROM_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOSTRAR_IND", p_MOSTRAR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNABLE_IND", p_RETORNABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAPACIDAD", p_CAPACIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_DESC_IND", p_SIN_DESC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMAG_RUTA", p_IMAG_RUTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_TEXIS", p_CODE_TEXIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VOLUMEN", p_VOLUMEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_VOLUMEN", p_UNME_VOLUMEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LISTA_IND", p_LISTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URLPROD", p_URLPROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRAC_CODE", p_DETRAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRAC_PORCENTAJE", p_DETRAC_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRECIO_IND", p_PRECIO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENBRUTO_IND", p_ENBRUTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESP_ADICIONAL", p_ESP_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRES_CODE", p_PRES_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO", p_PESO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_COMPRABLE_IND", p_COMPRABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ISC_CODE", p_ISC_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_CODE_GENERADO").Value
            ''cn.Ejecuta_parms(cmd)
            ''msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarPrecioIndProducto(ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_PRECIO_IND As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_PRECIO_IND_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRECIO_IND", p_PRECIO_IND, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function REGISTRAR_PRODUCTO(ByVal p_DESC As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CODE_AUXILIAR As String, ByVal p_ESTADO_IND As String,
                                       ByVal p_ESTADO_WEB_IND As String, ByVal p_UNME_CODE As String, ByVal p_GRUP_CODE As String, ByVal p_MARC_CODE As String,
                                       ByVal p_MODELO As String, ByVal p_USUA_ID As String, ByVal p_SIN_SERIE_IND As String, ByVal p_SERIADA_IND As String,
                                       ByVal p_SERVICIO_IND As String, ByVal p_ENSAMBLADO_IND As String, ByVal p_VALOR_TOTAL As String, ByVal p_NOMBRE_COMERCIAL As String,
                                       ByVal p_MONEDA_CODE As String, ByVal p_VALOR_MINIMO As Decimal, ByVal p_VALOR_DCTO As String, ByVal p_PROM_IND As String,
                                       ByVal p_MOSTRAR_IND As String, ByVal p_CTLG_CODE As String, ByVal p_RETORNABLE_IND As String, ByVal p_CAPACIDAD As String,
                                       ByVal p_IMAG_RUTA As String, ByVal p_CODE_TEXIS As String, ByVal p_VOLUMEN As String, ByVal p_UNME_VOLUMEN As String,
                                       ByVal p_LISTA_IND As String, ByVal p_URLPROD As String, Optional ByVal p_SIN_DESC_IND As String = "N", Optional ByVal p_DETRAC_CODE As String = "", Optional ByVal p_DETRAC_PORCENTAJE As String = "0",
                                       Optional p_TIPO_BIEN As String = "EXO", Optional p_ISC As String = "0", Optional p_ENBRUTO_IND As String = "S",
                                       Optional p_ESP_ADICIONAL As String = "", Optional p_PRES_CODE As String = Nothing,
                                       Optional p_PESO As String = "0", Optional p_COMPRABLE_IND As String = "S", Optional p_ISC_CODE As String = "") As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_AUXILIAR", p_CODE_AUXILIAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_WEB_IND", p_ESTADO_WEB_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_SERIE_IND", p_SIN_SERIE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADA_IND", p_SERIADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERVICIO_IND", p_SERVICIO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENSAMBLADO_IND", p_ENSAMBLADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_TOTAL", p_VALOR_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_COMERCIAL", p_NOMBRE_COMERCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_MONEDA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_MINIMO", p_VALOR_MINIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_DCTO", p_VALOR_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROM_IND", p_PROM_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOSTRAR_IND", p_MOSTRAR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNABLE_IND", p_RETORNABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAPACIDAD", p_CAPACIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_DESC_IND", p_SIN_DESC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMAG_RUTA", p_IMAG_RUTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_TEXIS", p_CODE_TEXIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VOLUMEN", p_VOLUMEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_VOLUMEN", p_UNME_VOLUMEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LISTA_IND", p_LISTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URLPROD", p_URLPROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRAC_CODE", p_DETRAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRAC_PORCENTAJE", p_DETRAC_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENBRUTO_IND", p_ENBRUTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESP_ADICIONAL", p_ESP_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRES_CODE", p_PRES_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO", p_PESO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE_IMAGEN", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("p_COMPRABLE_IND", p_COMPRABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ISC_CODE", p_ISC_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_CODE_IMAGEN").Value
            msg(2) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_PRODUCTO(ByVal p_ID As String, ByVal p_DESC As String, ByVal p_GRUPO As String,
                                   ByVal p_CODE_ANTIGUO As String, ByVal p_ALMC_CODE As String,
                                   ByVal p_CTLG_CODE As String, Optional p_ALMACENABLE_IND As String = "", Optional p_TEXI_IND As String = "",
                                   Optional p_NOMBRE As String = "", Optional p_SCSL_CODE As String = "") As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_ADM", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253)) 'S / N
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXI_IND", p_TEXI_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarMovimientoKardexProductos(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, p_FECHA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_MOVIMIENTOS_KARDEX_PRODUCTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_PRODUCTO_NAMINSA(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ALMACENABLE_IND As String, ByVal P_ESTADO_IND As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_NAMINSA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACENABLE_IND", P_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Return Nothing
        End Try
    End Function
    Public Function LISTAR_PRODUCTO_NAMINSA_NAM(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ALMACENABLE_IND As String, ByVal P_ESTADO_IND As String, ByVal P_MONEDA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_NAMINSA_NAM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACENABLE_IND", P_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONEDA", P_MONEDA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Return Nothing
        End Try
    End Function
    Public Function LISTAR_PRODUCTO_CECO(ByVal P_CTLG_CODE As String, ByVal P_FTVPROD_CODE As String, ByVal p_FTVTMOV_CODE As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_CECO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVPROD_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVPROD_CODE", P_FTVPROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTMOV_CODE", p_FTVTMOV_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Return Nothing
        End Try
    End Function





    'metodos de carlos
    Public Function ASIGNAR_PORCENTAJE_CATEGORIA_PRODUCTO(ByVal P_DETALLES As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_CREAR_CATEGORIA_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", P_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Dim msg1 As String = (cmd.Parameters("@p_MENSAJE").Value).ToString()


            Return msg1
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CUENTAS_SUBGRUPO(ByVal p_GRUP_CODE As String, ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_CUENTAS_SUBGRUPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                dt.Rows.Add()

                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Moreano
    Public Function LISTAR_KARDEX(ByVal p_PROD_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_MONE_CODE As String, ByVal p_CATALOGO As String, Optional ByVal p_FECHA As String = "")

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_REPORTE_KARDEX", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", IIf(p_FECHA = "", DBNull.Value, p_FECHA), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_KARDEX_2(ByVal p_PROD_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_MONE_CODE As String, ByVal p_CATALOGO As String, ByVal p_DESDE As String, ByVal p_HASTA As String, Optional ByVal p_FECHA As String = "")

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_REPORTE_KARDEX_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", IIf(p_FECHA = "", DBNull.Value, p_FECHA), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function busca_producto(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_CTLG_CODE As String, Optional p_UNME_DET As String = "") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_CANTIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_DET", p_UNME_DET, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function listar_stockProductos(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_MONE_CODE As String, Optional p_CTLG_CODE As String = "N") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_STOCK_PRODUCTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function listar_stockProductosCantidad(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_MONE_CODE As String, Optional p_CTLG_CODE As String = "N") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_STOCK_PRODUCTOS_CANTIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function
    Public Function listar_productosLogistico(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_MONE_CODE As String, ByVal p_DATO_LOG As String, Optional p_CTLG_CODE As String = "N") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_STOCK_PRODUCTOS_LOGISTICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATO_LOG", p_DATO_LOG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    'Lista todos productos para ver sus pesos
    Public Function listar_stockProductos_peso(ByVal p_ALMACEN As String, ByVal p_GRUPO As String, ByVal p_MONE_CODE As String, Optional p_CTLG_CODE As String = "N") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTOS_PESOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    'Lista todos productos y sus datos logisticos para UN almacen
    Public Function LISTAR_DATOS_LOGISTICOS(p_ALMC_CODE As String, p_CTLG_CODE As String, p_ROTACION_MENS As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_ControlReOrden", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROTACION_MENS", p_ROTACION_MENS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function



    Public Function STOCK_PRODUCTO(P_PROD_CODE As String, P_CTLG_CODE As String, P_ALMC_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_STOCK_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", P_ALMC_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    'Actualiza los datos logisticos para un producto
    Public Function ACTUALIZAR_DATOS_LOGISTICOS(ByVal p_PUNTO_REORDEN As String, ByVal p_STOCK_MINIMO As String, ByVal p_STOCK_MAXIMO As String, ByVal p_ALMC_CODE As String, ByVal p_PROD_CODE As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DATOS_LOGISTICOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PUNTO_REORDEN", p_PUNTO_REORDEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_MINIMO", p_STOCK_MINIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_MAXIMO", p_STOCK_MAXIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    'Actualiza los datos logisticos para un producto bloque
    Public Function ACTUALIZAR_DATOS_LOGISTICOS_BLOQUE(ByVal p_CADENA As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DATOS_LOGISTICOS_BLOQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CADENA", p_CADENA, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    'AGARCIA 02/03/2015
    Public Function LISTAR_SERIADOS(ByVal p_MCDR_CODE As String, ByVal p_DESC As String, ByVal p_PROD_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_VENDIDO_IND As String, ByVal p_SERIE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_MERCADERIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MCDR_CODE", p_MCDR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDIDO_IND", p_VENDIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarCampoGenerico(ByVal p_TABLA As String, ByVal p_CAMPO_FILTRO As String, ByVal p_CODIGO_FILTRO As String, ByVal p_CAMPO_ACTUALIZAR As String, ByVal p_VALOR_ACTUALIZAR As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_CAMPO_GENERICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TABLA", p_TABLA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAMPO_FILTRO", p_CAMPO_FILTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_FILTRO", p_CODIGO_FILTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAMPO_ACTUALIZAR", p_CAMPO_ACTUALIZAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_ACTUALIZAR", p_VALOR_ACTUALIZAR, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarProductoDetalladoStock(ByVal p_CTLG_CODE As String, ByVal p_ALMACENES As String, ByVal p_GRUPOS As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_DETALLADO_STOCK", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMACENES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPOS, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function



    Public Function Verifica_Movimentos_Kardex_Producto(ByVal p_CODE_PROD As String, ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_VERIFICA_MOV_KARDEX_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROD", p_CODE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function


    Public Function Seguimiento_existencias_con_serie(ByVal p_SERIE_PROD As String, p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_SEGUIMIENTO_EXISTENCIAS_SERIADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_PROD", p_SERIE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function


    Public Function Lista_series_producto(ByVal p_PROD_CODE As String, p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_SERIES_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function


    Public Function ListarProductosVistas(ByVal p_CTLG_CODE As String,
                                          ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTOS_VISTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_ubicacion_productos(ByVal p_CTLG_CODE As String,
                                         ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, p_PROD_CODE As String, p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_UBICACION_PRODUCTO_SERIE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarProducto_CentroCosto(ByVal p_CODE_PROD As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_CENTRO_COSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_CODE_PROD, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then

                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            'Throw (ex)
            Return Nothing
        End Try
    End Function

    Public Function ACTUALIZAR_PRODUCTO_CENTRO_COSTO(ByVal p_PROD_CODE As String, ByVal p_FTVPROD_CECC As String, ByVal p_FTVPROD_CECD As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_PRODUCTO_CENTRO_COSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVPROD_CECC", p_FTVPROD_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVPROD_CECD", p_FTVPROD_CECD, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarStockxProducto(p_PROD_CODE As String, p_CTLG_CODE As String, p_ALMC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_STOCKxPRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CreaNombreAltProducto(p_PROD_CODE As String, p_NOMBRE As String, p_USUARIO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_NOMBRE_ALT_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarNombreAltProducto(p_PROD_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_NOMBRE_ALT_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarNombreAltProductoTodo(p_PROD_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_NOMBRE_ALT_PRODUCTO_TODOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarNombreAltProducto(p_ID As Integer) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ELIMINAR_NOMBRE_ALT_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ID", p_ID, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GET_COD_PROD_GENERADO(p_CTLG_CODE As String, p_SUB_GRUP_CODE As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_GET_COD_PROD_AUTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUB_GRUP_CODE", p_SUB_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_PROD_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cn.Ejecuta_parms(cmd)
            Dim p_COD_PROD_GENERADO As String = cmd.Parameters("@p_COD_PROD_GENERADO").Value
            Return p_COD_PROD_GENERADO
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
