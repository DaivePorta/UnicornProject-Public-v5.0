Imports System.Reflection.Emit

Public Class NVVenta
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    'kkk
    Public Function ListarVendedorPorRol(ByVal p_CTLG_CODE As String, Optional ByVal p_ESTADO_IND As String = "A") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_LISTAR_VENDEDOR_POR_ROL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
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

    Public Function ListarDococumentos_Busq(p_CTLG_CODE As String, p_SCSL_CODE As String, p_MONEDA_CODE As String, p_CHK_INC_SERVICIOS As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DOCUMENTOS_BUSQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_MONEDA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHK_INC_SERVICIOS", p_CHK_INC_SERVICIOS, ParameterDirection.Input, 253))
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

    Public Function ListaMovimientoContableDetalle(p_CTLG_CODE As String, p_SCSL_CODE As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListarMovContDetalle", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarDocVenta_Busq(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_BUSQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_BusqFAST(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_BUSQ_FAST", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_Busq_2(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String, p_TIPO_VENTA As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_BUSQ_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VENTA", p_TIPO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_Busq_Serv(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String, p_TIPO_VENTA As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_BUSQ_SERV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VENTA", p_TIPO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_Normal(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_NORMAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocumentosCanjeablesAplicables(ByVal p_DESDE As String, p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String, p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTOS_CANJEABLES_APLICABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", If(String.IsNullOrEmpty(p_DESDE), DBNull.Value, p_DESDE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", If(String.IsNullOrEmpty(p_HASTA), DBNull.Value, p_HASTA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", If(String.IsNullOrEmpty(p_SCSL_CODE), String.Empty, p_SCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", If(String.IsNullOrEmpty(p_ESTADO), String.Empty, p_ESTADO), ParameterDirection.Input, 253))

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
    Public Function ListarTicketsConMovimientoBancario(p_CODE As String, p_CTLG_CODE As String, p_SCSL_CODE As String, p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_TICKETS_CON_MOVIMIENTO_BANC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", If(String.IsNullOrEmpty(p_SCSL_CODE), String.Empty, p_SCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", If(String.IsNullOrEmpty(p_ESTADO), String.Empty, p_ESTADO), ParameterDirection.Input, 253))

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
    Public Function ListarTicketsSinMovimientoBancario(p_CTLG_CODE As String, p_SCSL_CODE As String, p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_TICKETS_SIN_MOVIMIENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", If(String.IsNullOrEmpty(p_SCSL_CODE), String.Empty, p_SCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", If(String.IsNullOrEmpty(p_ESTADO), String.Empty, p_ESTADO), ParameterDirection.Input, 253))

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

    Public Function AplicarCanjearDocumento(ByVal p_FECHA As String, ByVal p_DOCUMENTO_NUEVO As String, ByVal p_AUTORIZACION As String, ByVal p_TIPO As String, ByVal p_COD_VENTA As String, ByVal p_MONTO_APLICADO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_APLICAR_CANJEAR_DOCUMENTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO_NUEVO", p_DOCUMENTO_NUEVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTORIZACION", p_AUTORIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_VENTA", p_COD_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_APLICADO", p_MONTO_APLICADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RPTA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarDetalleAsientos(p_CTLG_CODE As String, p_SCSL_CODE As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListarMovContDetalle", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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

    Public Function MayorizacionAsientosCont(p_CTLG_CODE As String, p_SCSL_CODE As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_MayorizacionMovContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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


    Public Function ListarDocVenta_Rap(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_RAP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_Busq_Toma_Pedido(p_CTLG As String, p_SCSL As String, p_USUARIO As String,
                                        p_TIPO_VTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_BUSQ_TOMA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL", p_SCSL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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


    Public Function ListarDctoVenta_TomPedido(p_CODE_VTAC As String, p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_OBTENER_DATOS_TOMA_PEDIDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VTA", p_CODE_VTAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))


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

    Public Function ListarDocVenta_reporte(P_PROD_CODE As String, P_CTLG_CODE As String, P_SCSL_CODE As String,
                                        P_MONE_CODE As String, P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_PRODUCTOS_VENDIDOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_reporte_subgrupo(P_SUBGRUPO_CODE As String, P_CTLG_CODE As String, P_SCSL_CODE As String,
                                        P_MONE_CODE As String, P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_SUBGRUPOS_VENDIDOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUBGRUPO_CODE", P_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))

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

    Public Function ListarDocVenta_reporte_marca(P_MARCA_CODE As String, P_CTLG_CODE As String, P_SCSL_CODE As String,
                                        P_MONE_CODE As String, P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_MARCAS_VENDIDOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_MARCA_CODE", P_MARCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))

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


    Public Function ListarDocVenta_reporte_cliente(P_CLIENTE_CODE As String, P_CTLG_CODE As String, P_SCSL_CODE As String,
                                        P_MONE_CODE As String, P_ANIO As String, P_MESES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_CLIENTE_VENDIDOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CLIENTE_CODE", P_CLIENTE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MESES", P_MESES, ParameterDirection.Input, 253))

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


    Public Function ListarDocVenta_Unica(ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_UNICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))

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


    Public Function Listar_todas_amortizaciones(ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TODAS_AMORTIZACIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VTAC", p_VTAC_CODE, ParameterDirection.Input, 253))

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


    Public Function Listar_cuenta_venta(ByVal p_CTLG As String, ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CUENTA_BANCO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VTAC", p_VTAC_CODE, ParameterDirection.Input, 253))

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




    Public Function ListaVendedor(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_USVE_USUA_ID As String,
                                           ByVal p_USVE_ESTADO_IND As String, ByVal p_ROLC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_VENDEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_ESTADO_IND", p_USVE_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ROLC_CODE", p_ROLC_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarProductosVentaWeb(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarProductosVentaWebSeriados(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_VENTA_WEB_SERIADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarServiciosWeb(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_SERVICIO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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

    'Public Function ListarDatosMonetariosCliente(ByVal p_PIDM As String, ByVal p_CTLG_CODE As String) As DataTable
    '    Try
    '        Dim dt As DataTable
    '        Dim cmd As IDbCommand

    '        cmd = cn.GetNewCommand("PFT_LISTAR_DATOS_RESUMEN_LINEA_CREDITO_CLIE", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

    '        dt = cn.Consulta(cmd)


    '        If Not (dt Is Nothing) Then
    '            Return dt
    '        Else
    '            Return Nothing
    '        End If
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function


    Public Function ListarProductosTodos(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_VENTA_TODOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarProductosAlmacen(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_POR_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarProductosAlmacenCab(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_POR_ALMACEN_CAB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarProductosAlmacenDet(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_POR_ALMACEN_DET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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
    Public Function ListarProductosTomaPedido(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_GRUPO_PROD As String, ByVal p_SUBGRUPO_CODE As String, ByVal p_TERMINO_BUSQ As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_TOMA_PEDIDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TERMINO_BUSQ", p_TERMINO_BUSQ, ParameterDirection.Input, 253))

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

    Public Function ListarProductosVentaWebCoti(ByVal p_CODE As String, ByVal p_CODE_ANTIGUO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ALMACENABLE_IND As String,
                                            ByVal p_SERIADO_IND As String, Optional ByVal p_GRUPO_PROD As String = "", Optional ByVal p_SUBGRUPO_CODE As String = "", Optional ByVal p_MARCA_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_PRODUCTO_VENTA_WEB2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ANTIGUO", p_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACENABLE_IND", p_ALMACENABLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIADO_IND", p_SERIADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO_CODE", p_SUBGRUPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA_CODE, ParameterDirection.Input, 253))

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

    Public Function fnListarProdCorto(p_CTLG_CODE As String, p_CODE As String, p_GRUPO_PROD As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PROD_CORTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))

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

    Public Function fnListarProdCortoSeriado(p_CTLG_CODE As String, p_CODE As String, p_GRUPO_PROD As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PROD_CORTO_SERIADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))

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
    Public Function verificarNroOperacion(ByVal p_NRO_OPERA As String) As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try

            cmd = cn.GetNewCommand("PFS_VERIFICAR_NRO_OPERACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_OPERA", p_NRO_OPERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RPTA").Value
        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function
    'Crea el QR con todos los parametros requeridos
    'Public Function ListarParametrosQR(ByVal p_codigo As String) As DataTable
    '    Try
    '        Dim dt As DataTable
    '        Dim cmd As IDbCommand

    '        cmd = cn.GetNewCommand("PFM_MOSTRAR_QR", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_codigo, ParameterDirection.Input, 253))

    '        dt = cn.Consulta(cmd)

    '        If Not (dt Is Nothing) Then
    '            Return dt
    '        Else
    '            Return Nothing
    '        End If
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function
    'Gurda la ruta de la imagen del QR convertida a base64
    Public Function GuardarCodigoQR_VENTA(ByVal p_CODE As String, ByVal p_IMGQR As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("GUARDAR_QR_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMGQR", p_IMGQR, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Gurda la ruta de la imagen del QR convertida a base64
    Public Function GuardarCodigoQR_ANTICIPO(ByVal p_CODE As String, ByVal p_IMGQR As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("GUARDAR_QR_ANTICIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMGQR", p_IMGQR, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Crea el QR con todos los parametros requeridos
    'Public Function ListarParametrosQRAnticipo(ByVal p_codigo As String) As DataTable
    '    Try
    '        Dim dt As DataTable
    '        Dim cmd As IDbCommand

    '        cmd = cn.GetNewCommand("PFM_MOSTRAR_QR_ANTICIPO", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_COTI", p_codigo, ParameterDirection.Input, 253))

    '        dt = cn.Consulta(cmd)

    '        If Not (dt Is Nothing) Then
    '            Return dt
    '        Else
    '            Return Nothing
    '        End If
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    'Crea un documento de venta que puede tener DESPACHO DIRECTO, tambien sus detalles y DATOS DE PAGO
    Public Function CrearDocumentoVentaRapidaWeb(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String, ByVal p_IMPORTE_GRAN_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_DETALLES_PAGO As String, ByVal p_DETALLES_PAGO2 As String, ByVal p_DETALLES_PAGO3 As String,
                                           ByVal p_DESPACHO_VENTA_IND As String, ByVal p_COBRAR_IND As String,
                                           ByVal p_EFECTIVO_RECIBIDO As String, ByVal p_EFECTIVO_RECIBIDO_ALTERNO As String, ByVal p_VUELTO As String, ByVal p_VUELTO_ALTERNO As String, ByVal p_AUTODETRACCION As String,
                                           Optional p_RESP_PIDM As String = Nothing, Optional ByVal p_VALIDAR_STOCK_IND As String = "S",
                                           Optional p_DETALLES_BONI As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = Nothing,
                                           Optional p_LONGITUD As String = Nothing,
                                           Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0.00") As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_DCTO_VENTA_RAPIDA_WEB", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRAN_REDONDEO", p_IMPORTE_GRAN_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO", p_DETALLES_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO2", p_DETALLES_PAGO2, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO3", p_DETALLES_PAGO3, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO_VENTA_IND", p_DESPACHO_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COBRAR_IND", p_COBRAR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTODETRACCION", p_AUTODETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDAR_STOCK_IND", p_VALIDAR_STOCK_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_DATOS_QR", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value
            'msg(2) = cmd.Parameters("@p_VTAC_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Crea una venta rápida DE SERVICIOS, TENIENDO sus detalles y DATOS DE PAGO -- NVMDOVS
    Public Function CrearVentaRapidaServiciosWeb(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String,
                                           ByVal p_DCTO_CODE_REF As String, ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_DETALLES_PAGO As String, ByVal p_DETALLES_PAGO2 As String, ByVal p_DETALLES_PAGO3 As String,
                                           ByVal p_DESPACHO_VENTA_IND As String, ByVal p_COBRAR_IND As String,
                                           ByVal p_EFECTIVO_RECIBIDO As String, ByVal p_EFECTIVO_RECIBIDO_ALTERNO As String, ByVal p_VUELTO As String, ByVal p_VUELTO_ALTERNO As String, ByVal p_AUTODETRACCION As String,
                                           ByVal p_KARDEX As String, Optional p_RESP_PIDM As String = Nothing, Optional ByVal p_VALIDAR_STOCK_IND As String = "S",
                                           Optional p_DETALLES_BONI As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = Nothing,
                                           Optional p_LONGITUD As String = Nothing,
                                           Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0.00") As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_VENTA_RAPIDA_SERVICIOS_WEB", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO", p_DETALLES_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO2", p_DETALLES_PAGO2, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO3", p_DETALLES_PAGO3, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO_VENTA_IND", p_DESPACHO_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COBRAR_IND", p_COBRAR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTODETRACCION", p_AUTODETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_KARDEX", p_KARDEX, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDAR_STOCK_IND", p_VALIDAR_STOCK_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_DATOS_QR", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value
            'msg(2) = cmd.Parameters("@p_VTAC_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'Graba un documento de venta y tambien sus detalles -- NVMDOCS
    Public Function CrearDocumentoVentaServiciosWeb(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_KARDEX As String,
                                           Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0", Optional p_NOMBRE_REFERENCIA As String = "") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_DCTO_VENTA_SERVICIOS_WEB", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_KARDEX", p_KARDEX, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REFERENCIA", p_NOMBRE_REFERENCIA, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Actualiza un documento de venta servicios y tambien sus detalles -- NVMDOCS
    Public Function ActualizarDocumentoVentaServiciosWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_KARDEX As String,
                                           Optional p_EFECTIVO_RECIBIDO As String = "", Optional p_EFECTIVO_RECIBIDO_ALTERNO As String = "", Optional p_VUELTO As String = "", Optional p_VUELTO_ALTERNO As String = "",
                                           Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0", Optional p_NOMBRE_REFERENCIA As String = "") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_DCTO_VENTA_SERVICIOS_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_KARDEX", p_KARDEX, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REFERENCIA", p_NOMBRE_REFERENCIA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Completa un documento de venta servicios grabado anteriormente -- NVMDOCS
    Public Function CompletarDocumentoVentaServiciosWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                          ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                          ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                          ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                          ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                          ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                          ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                          ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                          ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                          ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                          ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                          ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                          ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                          ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                          ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                          ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                          ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                          ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_KARDEX As String,
                                          Optional p_EFECTIVO_RECIBIDO As String = "", Optional p_EFECTIVO_RECIBIDO_ALTERNO As String = "", Optional p_VUELTO As String = "", Optional p_VUELTO_ALTERNO As String = "",
                                          Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                          Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "") As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_COMPLETAR_DCTO_VENTA_SERVICIOS_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_KARDEX", p_KARDEX, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_DATOS_QR", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value
            'msg(2) = cmd.Parameters("@p_VTAC_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'LISTA VENTAS RÁPIDAS DE SERVICIOS (NVLDOVS)
    Public Function ListarVentaRap_Serv(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_VENTA_RAPIDA_SERV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    'LISTA DOCUMENTOS VENTAS DE SERVICIOS (NVLDOCS)
    Public Function ListarDocVenta_Serv(p_VTAC_CODE As String, p_RAZON_SOCIAL As String, p_NUM_DCTO As String,
                                        p_TIPO_DCTO As String, p_VENDEDOR As String, p_ANULADO As String,
                                        p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String,
                                        p_HASTA As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                        Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "",
                                        Optional p_MONEDA As String = "", Optional p_TIPO_VTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_SERV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VTA", p_TIPO_VTA, ParameterDirection.Input, 253))

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

    'Crea un documento de venta que puede tener DESPACHO DIRECTO, tambien sus detalles y DATOS DE PAGO
    Public Function ActualizarCompletarDocumentoVentaRapidaWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_DETALLES_PAGO As String, ByVal p_DETALLES_PAGO2 As String, ByVal p_DETALLES_PAGO3 As String,
                                           ByVal p_DESPACHO_VENTA_IND As String, ByVal p_COBRAR_IND As String,
                                           ByVal p_EFECTIVO_RECIBIDO As String, ByVal p_EFECTIVO_RECIBIDO_ALTERNO As String, ByVal p_VUELTO As String, ByVal p_VUELTO_ALTERNO As String,
                                            Optional p_RESP_PIDM As String = Nothing, Optional ByVal p_VALIDAR_STOCK_IND As String = "S",
                                            Optional p_DETALLES_BONI As String = "",
                                            Optional p_DIRECCION As String = "",
                                            Optional p_LATITUD As String = Nothing,
                                            Optional p_LONGITUD As String = Nothing,
                                            Optional p_DETALLES_MUESTRA As String = "",
                                            Optional p_TOTAL_GRATUITAS As String = "0.00") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_COMPLETAR_DCTO_VENTA_RAPIDA_WEB", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO", p_DETALLES_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO2", p_DETALLES_PAGO2, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_PAGO3", p_DETALLES_PAGO3, ParameterDirection.Input, 253)) '25/02
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO_VENTA_IND", p_DESPACHO_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COBRAR_IND", p_COBRAR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDAR_STOCK_IND", p_VALIDAR_STOCK_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Actualiza un documento de venta y tambien sus detalles
    Public Function ActualizarDocumentoVentaRapidaWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String,
                                           Optional p_EFECTIVO_RECIBIDO As String = "", Optional p_EFECTIVO_RECIBIDO_ALTERNO As String = "", Optional p_VUELTO As String = "", Optional p_VUELTO_ALTERNO As String = "",
                                           Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0", Optional p_NOMBRE_REFERENCIA As String = "") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_DCTO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REFERENCIA", p_NOMBRE_REFERENCIA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    'Crea un documento de venta y tambien sus detalles
    Public Function CrearDocumentoVentaWeb(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String,
                                           Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0", Optional p_NOMBRE_REFERENCIA As String = "") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_DCTO_VENTA_WEB", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REFERENCIA", p_NOMBRE_REFERENCIA, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Actualiza un documento de venta y tambien sus detalles
    Public Function ActualizarDocumentoVentaWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String,
                                            Optional p_EFECTIVO_RECIBIDO As String = "", Optional p_EFECTIVO_RECIBIDO_ALTERNO As String = "", Optional p_VUELTO As String = "", Optional p_VUELTO_ALTERNO As String = "",
                                           Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                           Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "",
                                           Optional p_TOTAL_GRATUITAS As String = "0", Optional p_NOMBRE_REFERENCIA As String = "") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_DCTO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL_GRATUITAS", p_TOTAL_GRATUITAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REFERENCIA", p_NOMBRE_REFERENCIA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Completa un documento de venta grabado anteriormente
    Public Function CompletarDocumentoVentaWeb(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                          ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                          ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                          ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                          ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                          ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                          ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                          ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                          ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                          ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                          ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                          ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                          ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                          ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String,
                                          ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                          ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                          ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                          ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String,
                                          Optional p_EFECTIVO_RECIBIDO As String = "", Optional p_EFECTIVO_RECIBIDO_ALTERNO As String = "", Optional p_VUELTO As String = "", Optional p_VUELTO_ALTERNO As String = "",
                                          Optional p_RESP_PIDM As String = Nothing, Optional p_DETALLES_BONI As String = "", Optional p_DETALLES_MUESTRA As String = "",
                                          Optional p_DIRECCION As String = "",
                                           Optional p_LATITUD As String = "",
                                           Optional p_LONGITUD As String = "") As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_COMPLETAR_DCTO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONI", p_DETALLES_BONI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_DATOS_QR", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_VTAC_CODE").Value
            msg(1) = cmd.Parameters("@p_VTAC_NUM_SEQ_DOC").Value
            'msg(2) = cmd.Parameters("@p_VTAC_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Lista la cabecera de un documento de venta
    Public Function ListarDocumentosVenta(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                          ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                          ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    Public Function ListarCabeceraVentaUnica(ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_CABECERA_VENTA_UNICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
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

    'DPORTA 15/05/2022
    Public Function ListarCabDctoVentaImpresion(ByVal p_VTAC_CODE As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_CABECERA_VENTA_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
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
    Public Function ListarFecha_MedioPago(ByVal p_DCTO_CODE As String, ByVal p_CTLG As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_FECHA_Y_MEDIO_PAGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
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

    'DPORTA 15/05/2022
    Public Function ListarDetDctoVentaImpresion(ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_VENTA_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
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

    'Lista la cabecera de un documento de venta
    Public Function ListarDocumentosVentaNaminsa(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                          ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                          ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_NAMINSA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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



    'Lista los detalles de un documento de venta
    Public Function ListarDetalleDocumentoVenta(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                                Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015 PARA SABER STOCK
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015
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

    'Lista los detalles de un documento de venta sin anticipos en el detalle
    Public Function ListarDetalleDocumentoVenta2(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                                Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_WEB_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015 PARA SABER STOCK
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015
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

    'Lista los detalles de un documento de venta para recalcular utilidad
    Public Function ListarDetalleDocumentoVentaUtilidad(ByVal p_VTAC_CODE As String, Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_UTILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarDetalleDocumentoVentaNVLDOCT(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                                Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_WEB_nvldoct", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015 PARA SABER STOCK
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015
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

    Public Function ListarDetalleDocumentoVentaNVLDOCT_FAST(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                                Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_WEB_nvldoct_FAST", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015 PARA SABER STOCK
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253)) 'AGARCIA 30/07/2015
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

    Public Function ListarDetalleBonificacionDocumentoVenta(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                              Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_BONIFICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarDetalleMuestraDocumentoVenta(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String,
                                            Optional ByVal p_CTLG_CODE As String = "", Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_MUESTRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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

    'LISTA LA CABECERA DE VENTA PARA IMPRESION CON FORMATO EN EL CONFIGURADOR DE FORMATOS DE IMPRESION
    Public Function ListarDocumentoVentaImpresion(ByVal p_VTAC_CODE As String, ByVal p_INC_IGV As String, ByVal p_COPIA_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_IGV", p_INC_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COPIA_IND", p_COPIA_IND, ParameterDirection.Input, 253))
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
    'LISTA LA DETALLES DE VENTA PARA IMPRESION CON FORMATO EN EL CONFIGURADOR DE FORMATOS DE IMPRESION
    Public Function ListarDetalleDocumentoVentaImpresion(ByVal p_VTAC_CODE As String, ByVal p_INC_IGV As String, ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_IGV", p_INC_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
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

    'Anular un documento de Venta
    Function AnularDocumentoVenta(VTAC_CODE As String, NUM_SEQ_DOC As String, ANULAC_ID As String, CMNT_ANULAC As String,
                                  ByVal p_DEVOLUCION_EFECTIVO As String, ByVal p_DEVOLUCION_DESPACHO As String,
                                  ByVal p_MOTIVO_CODE As String) As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try
            cmd = cn.GetNewCommand("PFV_ANULAR_VENTA_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_ID", ANULAC_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_EFECTIVO", p_DEVOLUCION_EFECTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_DESPACHO", p_DEVOLUCION_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CODE", p_MOTIVO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESPUESTA").Value

            If msg = "OK" Then
                ActualizarLimiteMuestra_anula(VTAC_CODE, NUM_SEQ_DOC)
            End If

        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function

    'REPORTES ------------------------------------------------------------------------------------
    '---------------------------------------------------------------------------------------------
    Public Function ListarAniosVentas(Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_ANIOS_VENTAS", CommandType.StoredProcedure)
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

    'Reporte para el formulario NVLRACV
    Public Function ReporteComparativoAnaliticoVentas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIOS As String,
                                                     ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, ByVal p_USVE_CODE As String, ByVal p_PROD_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_COMPARATIVO_ANALITICO_VENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIOS", p_ANIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_CODE", p_USVE_CODE, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoVentasAnuales(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIOS As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_VENTAS_ANUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIOS", P_ANIOS, ParameterDirection.Input, 253))
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
    'Reporte para el formulario NVLRACE
    Public Function ReporteComparativoAnaliticoVendedores(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIO As String,
                                                    ByVal p_VENDEDORES As String, ByVal p_IGV As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_COMPARATIVO_ANALITICO_VENDEDORES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDORES", p_VENDEDORES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoVentasMensuales(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_VENTAS_MENSUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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


    Public Function ReporteAnaliticoVentasMensualesDetalle(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String, ByVal P_MES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_VENTAS_MENSUALES_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MES", P_MES, ParameterDirection.Input, 253))
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

    'Reporte para el formulario NVLRASV
    Public Function ReporteAnaliticoSubgruposVendidos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_SUBGRUPOS_VENDIDOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteProductosVendidos(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_PRODUCTOS_VENDIDOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteMarcasVendidas(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_MARCAS_VENDIDAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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

    'Reporte para el formulario NVLRAVC
    Public Function ReporteAnaliticoVentasClientes(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIOS As String, ByVal p_MESES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_VENTAS_CLIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIOS", p_ANIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MESES", p_MESES, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoVentasTodosLosClientes(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIOS As String, ByVal p_MESES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_ANALITICO_VENTAS_TODOS_LOS_CLIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIOS", p_ANIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MESES", p_MESES, ParameterDirection.Input, 253))
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

    'PLANTILLAS DE DCTOS DE VENTA ----------------------------------------------------------------
    '---------------------------------------------------------------------------------------------

    'Crea una Plantilla de  documento de venta y tambien sus detalles
    Public Function CrearPlantillaVenta(ByVal p_TIPO_DCTO As String,
                                           ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String, ByVal p_DETALLES_BONIFICACION As String, ByVal p_DETALLES_MUESTRA As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_DESC_PLAN As String,
                                           Optional p_RESP_PIDM As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_PLANTILLA_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se registro la plantilla
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_PLAN", p_DESC_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONIFICACION", p_DETALLES_BONIFICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_PLAN_CODE").Value
            msg(1) = cmd.Parameters("@p_PLAN_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Lista la cabecera de una Plantilla de documento de venta
    Public Function ListarPlantillaVenta(ByVal p_PLAN_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                         ByVal p_MONE_CODE As String, ByVal p_TIPO_DCTO_PLAN As String, ByVal p_PIDM As String,
                                         ByVal p_ESTADO_IND As String, ByVal p_ANIO As String, ByVal p_MES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_PLANTILLA_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_CODE", p_PLAN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO_PLAN", p_TIPO_DCTO_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))

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

    'Lista los detalles de una Plantilla venta
    Public Function ListarCabeceraPlantillaVenta(ByVal p_VTAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_CABECERA_PLANTILLA_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
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



    'Lista los detalles de una Plantilla venta
    Public Function ListarDetallePlantillaVenta(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_PLANTILLA_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
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

    'Dar de baja una plantilla documento de Venta
    Function EliminarPlantillaVenta(ByVal PLAN_CODE As String, ByVal USUA_ID As String) As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try
            cmd = cn.GetNewCommand("PFV_ELIMINAR_PLANTILLA_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAN_CODE", PLAN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", USUA_ID, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function

    'REPORTE CRONOLOGICO DE VENTAS

    Public Function ReporteCronologicoVentas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DIAS As String, ByVal p_GRUPO As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_RANGO_HORARIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_DISPERSION_CRONOLOGICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_GRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS", p_DIAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RANGO_HORARIO", p_RANGO_HORARIO, ParameterDirection.Input, 253))
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

    Public Function ListadoProductosVendidos(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_DESDE As String,
                                             ByVal p_HASTA As String, ByVal p_VENDEDOR As String, ByVal p_MONEDA As String, ByVal p_TIPO_VENTA As String, Optional ByVal p_GRUPO_PROD As String = "",
                                             Optional ByVal p_PROD_CODE As String = "", Optional ByVal p_ENTREGADO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_PRODUCTOS_VENDIDOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGADO", p_ENTREGADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VENTA", p_TIPO_VENTA, ParameterDirection.Input, 253))
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



    Public Function ReporteAnaliticoVentasxSegmentacion(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal p_NIVEL As String, ByVal p_DESDE As String,
                                                        ByVal p_HASTA As String, ByVal p_GRUPO_PROD As String, ByVal p_PROD_CODE As String, ByVal p_MONEDA As String, ByVal p_MARCA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_SGMT_TIPO_CANAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVEL", p_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA", p_MARCA, ParameterDirection.Input, 253))

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


    Public Function Obtener_valor_Muestra(ByVal p_FEC_I_MUESTRA As String,
                                          ByVal p_FEC_F_MUESTRA As String,
                                          ByVal p_FEC_I_VENTAS As String,
                                          ByVal p_FEC_F_VENTAS As String,
                                          ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_OBTENER_VALOR_MUESTRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_I_MUESTRA", p_FEC_I_MUESTRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_F_MUESTRA", p_FEC_F_MUESTRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_I_VENTAS", p_FEC_I_VENTAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_F_VENTAS", p_FEC_F_VENTAS, ParameterDirection.Input, 253))
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


    Public Function ReporteAnaliticoMensualVentasxSegmentacion(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal p_NIVEL As String, ByVal p_ANHO As String,
                                                      ByVal p_MONEDA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_SGMT_MENSUAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVEL", p_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))


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

#Region "MOTIVOS ANULACION DOCUMENTOS VENTA Y OTROS"
    Public Function CrearMotivoAnulacion(ByVal p_CTLG_CODE As String, ByVal p_MOTIVO As String, ByVal p_DESC_MOTIVO As String,
                                         ByVal p_TIPO_DCTO As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FTV_CREAR_MOTIVO_ANULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_MOTIVO", p_DESC_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function

    Public Function ActualizarMotivoAnulacion(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_MOTIVO As String,
                                              ByVal p_DESC_MOTIVO As String, ByVal p_TIPO_DCTO As String, ByVal p_ESTADO_IND As String,
                                              ByVal p_USUA_ID As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FTV_ACTUALIZAR_MOTIVO_ANULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_MOTIVO", p_DESC_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = p_CODE
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function

    Public Function ListarMotivoAnulacion(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_TIPO_DCTO As String,
                                              ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FTV_LISTAR_MOTIVO_ANULACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

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
#End Region


    Public Function ReporteFacturacionxFechas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_MONEDA As String, Optional ByVal p_ENTREGADO As String = "S") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_FACTURACION_X_FECHAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            If p_DESDE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If
            If p_HASTA = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGADO", p_ENTREGADO, ParameterDirection.Input, 253))
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


    Public Function ReportePreVentasxFechas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_PREVENTA_X_FECHAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            If p_DESDE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If
            If p_HASTA = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If
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

    Public Function ReporteMotivosNoEntrega(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_REPORTE_MOTIVOS_NO_ENTREGA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            If p_DESDE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If
            If p_HASTA = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If
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

    Function ListarDctoVentaUtilidad(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_TIPO_DCTO As String, ByVal p_VENDEDOR As String, ByVal p_ANULADO As String,
                                           ByVal p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String, ByVal p_HASTA As String,
                                           p_CTLG_CODE As String, p_SCSL_CODE As String, Optional p_COMPLETO_IND As String = "", Optional p_GRUPO_PROD As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_UTILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))

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

    Function ListarRankingClientes(p_CTLG_CODE As String, p_SCSL_CODE As String, p_MONE_CODE As String, p_VENDEDOR As String, p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_LISTAR_RANKING_CLIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
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

    Function ListarInfoextraTracking(p_TIPO_DCTO As String, p_CODIGO_DCTO As String, p_CODIGO_ORIGEN As String,
                                     p_TIPO_IND As String, Optional p_OPCIONAL_1 As String = "", Optional p_OPCIONAL_2 As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_INFOEXTRA_TRACKING", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_DCTO", p_CODIGO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_ORIGEN", p_CODIGO_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPCIONAL_1", p_OPCIONAL_1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPCIONAL_2", p_OPCIONAL_2, ParameterDirection.Input, 253))
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

    ' REGISTRO EN LIMITE DE MUESTRA
    Public Function ActualizarLimiteMuestra(ByVal p_CTLG_CODE As String, ByVal p_ANIO As Integer, ByVal p_Mes As Integer, p_Monto As Decimal) As DataTable
        Dim msg(2) As String
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_ACTUALIZAR_LIMITE_MUESTRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVLIMITE_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVLIMITE_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVLIMITE_MES", p_Mes, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVLIMITE_MONTO_CONSUMIDO", p_Monto, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
        Return dt
    End Function

    Public Function ActualizarLimiteMuestra_anula(ByVal p_VTAC_CODE As String, ByVal p_NUM_SEQ_DOC As String) As DataTable
        Dim msg(2) As String
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("ELIMINAR_MONTO_CONSUMO_MUESTRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", p_NUM_SEQ_DOC, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
        Return dt
    End Function

    Public Function fnGetDocVta(p_CodVenta As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_DOC_VTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodVenta", p_CodVenta, ParameterDirection.Input, 253))

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
            Throw (ex)
        End Try
    End Function

    Public Function fnGetDocAnti(p_CodAnticipo As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_DOC_ANTICIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodAnticipo", p_CodAnticipo, ParameterDirection.Input, 253))

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
            Throw (ex)
        End Try
    End Function

    Public Function ListarCabAnticipo(ByVal p_CodAnticipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_CABECERA_ANTICIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodAnticipo", p_CodAnticipo, ParameterDirection.Input, 253))
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

    Public Function fnGetSaldoDocVta(p_CodVenta As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_GET_SALDO_DOC_VTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodVenta", p_CodVenta, ParameterDirection.Input, 253))

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
            Throw (ex)
        End Try
    End Function

    Public Function ListadoRankingProductosVendidos(p_CTLG_CODE As String, p_SCSL_CODE As String, p_RAZON_SOCIAL As String, p_DESDE As String,
                                          p_HASTA As String, p_VENDEDOR As String, p_MONEDA As String, p_TIPO_VENTA As String, ByVal p_GRUPO_PROD As String,
                                          p_PROD_CODE As String, p_ENTREGADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_RANKING_PRODUCTOS_VENDIDOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO_PROD", p_GRUPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGADO", p_ENTREGADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_VENTA", p_TIPO_VENTA, ParameterDirection.Input, 253))
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

    Public Sub fnActualizarCodContabDocVenta(p_CodDocVenta As String, p_CodMovCont As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarCodContabDocVenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocVenta", p_CodDocVenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovCont", p_CodMovCont, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub fnActualizarCodContabDocAnticipo(p_CodDocAnticipo As String, p_CodMovCont As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarCodContabDocAnticipo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocAnticipo", p_CodDocAnticipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovCont", p_CodMovCont, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    'LISTA DE ATENCIONES PENDIENTES DE PAGO, PROVENIENTES DE SISNOT
    Public Function ListarAtencionesPendientes() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_NRO_ATENCIONES", CommandType.StoredProcedure)

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

    'DETALLE DE UNA ATENCIÓN SELECCIONADA 
    Public Function ListarDetalleAtencion(ByVal p_NRO_ATENCION As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_DETALLE_ATENCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_ATENCION", p_NRO_ATENCION, ParameterDirection.Input, 253))
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
    'DATOS DE LOS PRODUCTOS DEL DETALLE
    Public Function ListarDatosProducto(ByVal p_CODIGO_PRODUCTO As String, ByVal p_CTLG As String, ByVal p_ALMC_CODE As String,
                                        ByVal p_CANTIDAD_PROD As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_DATOS_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_PRODUCTO", p_CODIGO_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_PROD", p_CANTIDAD_PROD, ParameterDirection.Input, 253))
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

    Public Function PermisoModificarVenta(ByVal p_USUARIO As String, Optional ByVal p_CTLG_CODE As String = "A") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_PERMISO_MODIFICAR_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
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

End Class
